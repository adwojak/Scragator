import jwt
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from backend.config import Config
from backend.extensions import db, migrate, scheduler, jwt
from backend.routing import routing
from backend.models.models import RevokedTokenModel


def create_routing(api) -> None:
    for resource, routes in routing.items():
        api.add_resource(resource, *routes)


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    api: Api = Api(app)
    create_routing(api)

    db.init_app(app)
    db.app = app
    migrate.init_app(app, db)

    jwt.init_app(app)

    scheduler.init_app(app)
    scheduler.start()

    return app


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)
