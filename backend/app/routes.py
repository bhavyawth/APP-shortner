from flask import Blueprint, request, jsonify, redirect,render_template
from .services import create_short_url, resolve_url
from app.models import URLDatabase
from app.analytics import get_user_stats
import qrcode
import base64
from io import BytesIO
from datetime import datetime
import hashlib

db = URLDatabase()

url_blueprint = Blueprint("url_shortener", __name__)

@url_blueprint.route("/shorten", methods=["POST"])
def shorten():
    data = request.json
    long_url = data.get("url")
    user_token = data.get("user_token")
    custom_code = data.get("custom_code")

    password = data.get("password")                
    expiry_minutes = data.get("expiry_minutes")    

    if not long_url or not user_token:
        return jsonify({"error": "url and user_token required"}), 400

    result = create_short_url(
        long_url,
        request.host_url,
        user_token,
        custom_code,
        password=password,
        expiry_minutes=expiry_minutes
    )
    return jsonify(result)

@url_blueprint.route("/<code>", methods=["GET", "POST"])
def redirect_url(code):
    data = request.form or {}

    password = data.get("password")

    row = db.get_url_full(code)
    if not row:
        return "URL not found", 404

    long_url, password_hash, expiry_time = row

    # Expiry check
    if expiry_time:
        expiry_dt = datetime.fromisoformat(expiry_time)
        if datetime.utcnow() > expiry_dt:
            return render_template("expired_page.html")


    # Password protection
    if password_hash:
        # If no password submitted yet → show form
        if not password:
            return render_template("password_page.html")

        # Check password
        if hashlib.sha256(password.encode()).hexdigest() != password_hash:
            return render_template("password_page.html", error="Wrong password!")

    # Successful access → count click and redirect
    db.increment_click(code)
    return redirect(long_url)

@url_blueprint.route("/stats", methods=["POST"])
def stats():
    data = request.json
    user_token = data.get("user_token")

    if not user_token:
        return jsonify({"error": "user_token required"}), 400

    return jsonify(get_user_stats(user_token))

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

    qr = qrcode.make(url)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    qr_bytes = buffer.getvalue()
    qr_base64 = base64.b64encode(qr_bytes).decode()

    return jsonify({"qr": qr_base64})
