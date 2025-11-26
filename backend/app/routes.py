from flask import Blueprint, request, jsonify, redirect
from .services import create_short_url, resolve_url
from app.models import URLDatabase
from app.analytics import get_user_stats
import qrcode
import base64
from io import BytesIO

db = URLDatabase()

url_blueprint = Blueprint("url_shortener", __name__)

# Create URL
@url_blueprint.route("/shorten", methods=["POST"])
def shorten():
    data = request.json
    long_url = data.get("url")
    user_token = data.get("user_token")
    custom_code = data.get("custom_code")

    if not long_url or not user_token:
        return jsonify({"error": "url and user_token required"}), 400

    result = create_short_url(long_url, request.host_url, user_token, custom_code)
    return jsonify(result)

# Redirect to long URL
@url_blueprint.route("/<code>")
def redirect_url(code):
    url = resolve_url(code)
    if url:
        return redirect(url)
    return jsonify({"error": "URL not found"}), 404

# User stats
@url_blueprint.route("/stats", methods=["POST"])
def stats():
    data = request.json
    user_token = data.get("user_token")

    if not user_token:
        return jsonify({"error": "user_token required"}), 400

    return jsonify(get_user_stats(user_token))

# Get all URLs for a user
@url_blueprint.route("/my-urls", methods=["POST"])
def my_urls():
    data = request.json
    user_token = data.get("user_token")

    rows = db.get_user_urls(user_token)

    return jsonify([
        {
            "code": r[0],
            "long_url": r[1],
            "clicks": r[2]
        }
        for r in rows
    ])
@url_blueprint.route("/qr", methods=["POST"])
def generate_qr():
    data = request.json
    code = data.get("code")

    if not code:
        return jsonify({"error": "code is required"}), 400

    url = f"{request.host_url}{code}"

    # Generate QR
    qr = qrcode.make(url)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    qr_bytes = buffer.getvalue()
    qr_base64 = base64.b64encode(qr_bytes).decode()

    return jsonify({"qr": qr_base64})
