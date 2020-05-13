import jwt
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from backend.config import DevelopmentConfig
from backend.routing import routing
from backend.extensions import db, jwt, migrate, scheduler
from backend.models.models import RevokedTokenModel


def create_routing(api) -> None:
    for resource, routes in routing.items():
        api.add_resource(resource, *routes)


def create_app(config_class: type = DevelopmentConfig, init_scheduler: bool = True) -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)
    app.config.from_object(config_class)

    api: Api = Api(app)
    create_routing(api)

    db.init_app(app)
    db.app = app
    migrate.init_app(app, db)

    jwt.init_app(app)

    if init_scheduler:
        # For testing purpose, scheduler is turned off
        scheduler.init_app(app)
        scheduler.start()

    return app


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)
