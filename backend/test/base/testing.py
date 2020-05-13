from json import dumps
from typing import NoReturn, Optional

from flask import Flask
from flask.testing import FlaskClient
from flask.wrappers import Response

from backend.config import TestingConfig
from backend.test.base.database import DatabaseBase
from backend.test.base.validators import validate_http_status


class TestingBase(DatabaseBase):
    def init_test(self, app) -> NoReturn:
        self.app: Flask = app(TestingConfig)

    def assert_match(self, value, expected) -> NoReturn:
        assert value == expected

    def assert_dicts(self, dictionary: dict, expected: dict) -> NoReturn:
        dict_dumped: str = dumps(dictionary, sort_keys=True, default=str)
        excpected_dumped: str = dumps(expected, sort_keys=True, default=str)
        assert dict_dumped == excpected_dumped


class ResourceTesting(TestingBase):

    default_headers: dict = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    def init_test(self, app) -> NoReturn:
        super().init_test(app)
        self.client: FlaskClient = self.app.test_client()

    @property
    def url(self) -> NoReturn:
        raise NotImplementedError

    def get(self, headers: Optional[dict] = None) -> Response:
        return self.client.get(self.url, headers=headers or self.default_headers)

    def post(self, request: dict, headers: Optional[dict] = None) -> Response:
        return self.client.post(self.url, headers=headers or self.default_headers, data=request)

    def request_get(self, headers: Optional[dict] = None) -> list:
        response: Response = self.get(headers)
        validate_http_status(response.status_code)
        return response.json

    def request_post(self, request: dict, headers: Optional[dict] = None) -> list:
        response: Response = self.post(request, headers)
        validate_http_status(response.status_code)
        return response.json
