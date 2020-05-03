from flask import Flask
from json import dumps
from typing import NoReturn

from backend.config import TestingConfig
from backend.test.base.database import DatabaseBase


class TestingBase(DatabaseBase):
    def init_test(self, app) -> NoReturn:
        self.app: Flask = app(TestingConfig)

    def assert_match(self, value, expected) -> NoReturn:
        assert value == expected

    def assert_dicts(self, dictionary: dict, expected: dict) -> NoReturn:
        dict_dumped: str = dumps(dictionary, sort_keys=True, default=str)
        excpected_dumped: str = dumps(expected, sort_keys=True, default=str)
        assert dict_dumped == excpected_dumped
