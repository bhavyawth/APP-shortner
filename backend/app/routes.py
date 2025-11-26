from flask import Blueprint, request, jsonify, redirect
from .services import create_short_url, resolve_url
from app.models import URLDatabase as db

url_blueprint = Blueprint("url_shortener", __name__)

# Create short URL
@url_blueprint.route("/shorten", methods=["POST"])
def shorten():
    data = request.json
    long_url = data.get("url")
    user_token = data.get("user_token")

    if not long_url or not user_token:
        return jsonify({"error": "url and user_token required"}), 400

    result = create_short_url(long_url, request.host_url, user_token)
    return jsonify(result)

# Redirect
@url_blueprint.route("/<code>")
def redirect_url(code):
    url = resolve_url(code)
    if url:
        return redirect(url)
    return jsonify({"error": "URL not found"}), 404

# Stats (Pandas / NumPy)
from app.analytics import get_user_stats

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
        {"code": r[0], "long_url": r[1]}
        for r in rows
    ])
