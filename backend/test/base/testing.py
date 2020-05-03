from json import dumps

from backend.config import TestingConfig
from backend.test.base.database import DatabaseBase


class TestingBase(DatabaseBase):
    def init_test(self, app):
        self.app = app(TestingConfig)

    def assert_match(self, value, expected):
        assert value == expected

    def assert_dicts(self, dictionary, expected):
        dict_dumped = dumps(dictionary, sort_keys=True, default=str)
        excpected_dumped = dumps(expected, sort_keys=True, default=str)
        assert dict_dumped == excpected_dumped
