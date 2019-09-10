from flask import Flask

from config import Config
from extensions import db, migrate
# from models import models


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    return app
