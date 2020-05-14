from datetime import datetime

from flask import Flask
from pytest import fixture, yield_fixture

from backend.app import create_app
from backend.config import TestingConfig
from backend.extensions import db
from backend.models.models import UserModel, ArticleModel, RevokedTokenModel
from backend.scrappers.names import ScrapperNames


@yield_fixture
def app() -> Flask:
    def _app(config_class, init_scheduler=False) -> Flask:
        __app: Flask = create_app(config_class, init_scheduler)

        if config_class is TestingConfig:
            db.drop_all()
            db.create_all()

        return __app

    yield _app
    db.session.remove()
    db.drop_all()


@fixture
def user() -> UserModel:
    return UserModel(
        email='example@email.com',
        password='3515687c045a1fe0eee41f0b6c660568c73556eeddef7b4cf2748b165ff9955b6be46867c91a07b4c356947fc0831625472c0e2d2332c37995681496086d1b355b94aaae98f90cb21b64540ecf31e4d66e914f698c644054146cf5083150cb10'
    )


@fixture
def register_form() -> dict:
    return {
        'email': 'example@email.com',
        'password': 'examplePassword',
        'password_confirm': 'examplePassword'
    }


@fixture
def login_form() -> dict:
    return {'email': 'example@email.com', 'password': 'examplePassword'}


@fixture
def article() -> ArticleModel:
    return ArticleModel(
        name=ScrapperNames.NIEBEZPIECZNIK.name,
        title='Article title',
        url='articleurl.com/asd',
        author='Article author',
        upload_date=datetime(2020, 4, 22, 11, 31),
    )


@fixture
def revoked_token() -> RevokedTokenModel:
    return RevokedTokenModel(
        jti='examplejti'
    )
