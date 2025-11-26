from .models import URLDatabase
from .utils import generate_short_code, log_to_file

db = URLDatabase()

def create_short_url(long_url, host, user_token):
    try:
        if not long_url.startswith("http://") and not long_url.startswith("https://"):
            long_url = "https://" + long_url

        code = generate_short_code()
        db.insert_url(code, long_url, user_token)

        log_to_file(f"Created short URL for user {user_token}: {long_url}")

        return {
            "short_code": code,
            "short_url": f"{host}{code}"
        }

    except Exception as e:
        log_to_file(f"Error creating short URL: {e}")
        raise

def resolve_url(code):
    long_url = db.get_url(code)
    log_to_file(f"Redirect request for code: {code}")
    return long_url
