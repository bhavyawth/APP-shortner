from .models import URLDatabase
from .utils import generate_short_code, log_to_file
import hashlib
from datetime import datetime, timedelta


db = URLDatabase()

def create_short_url(long_url, host, user_token, custom_code=None, password=None, expiry_minutes=None):
    try:
        if not long_url.startswith("http://") and not long_url.startswith("https://"):
            long_url = "https://" + long_url

        if custom_code:
            code = custom_code
            if db.get_url(code):
                return {"error": "Custom code already taken!"}
        else:
            code = generate_short_code()

        password_hash = hashlib.sha256(password.encode()).hexdigest() if password else None

        expiry_time = None
        if expiry_minutes:
            expiry_time = (datetime.utcnow() + timedelta(minutes=expiry_minutes)).isoformat()

        db.insert_url(code, long_url, user_token, password_hash, expiry_time)

        return {
            "short_code": code,
            "short_url": f"{host}{code}",
            "expires_at": expiry_time,
            "password_protected": bool(password)
        }

    except Exception as e:
        log_to_file(f"Error creating short URL: {e}")
        raise

def resolve_url(code):
    long_url = db.get_url(code)
    log_to_file(f"Redirect request for code: {code}")
    return long_url

def resolve_url(code):
    long_url = db.get_url(code)
    if long_url:
        db.increment_click(code) 
    log_to_file(f"Redirect request for code: {code}")
    return long_url
