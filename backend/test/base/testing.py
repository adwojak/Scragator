from backend.config import TestingConfig
from backend.test.base.database import DatabaseBase


class TestingBase(DatabaseBase):
    def init_test(self, app):
        self.app = app(TestingConfig)

    def assert_match(self, value, expected):
        assert value == expected
