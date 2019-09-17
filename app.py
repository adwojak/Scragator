from flask import Flask

from config import Config
from extensions import db, migrate
from models import models
from Manager import Manager


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)

    @app.route('/')
    def hello():
        Manager().execute_observers()
        return 'aa'

    return app
