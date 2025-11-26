from flask import Flask
from .routes import url_blueprint
from flask_cors import CORS
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.register_blueprint(url_blueprint)
    return app
