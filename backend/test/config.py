from pytest import yield_fixture

from backend.app import create_app
from backend.extensions import db
from backend.config import TestingConfig


@yield_fixture
def app():
    def _app(config_class):
        __app = create_app(config_class)
        # __app.test_request_context().push()

        if config_class is TestingConfig:
            db.drop_all()
            db.create_all()

        return __app

    yield _app
    db.session.remove()
    db.drop_all()

