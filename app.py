from flask import Flask
from flask_restful import Api

from config import Config
from extensions import db, migrate, scheduler
from routing import routing


def create_routing(api):
    for resource, routes in routing.items():
        api.add_resource(resource, *routes)


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)

    api = Api(app)
    create_routing(api)

    db.init_app(app)
    db.app = app
    migrate.init_app(app, db)

    scheduler.init_app(app)
    scheduler.start()

    return app
