import random
import string

def generate_short_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def log_to_file(message):
    with open("requests.log", "a") as f:
        f.write(message + "\n")
