from copy import deepcopy
from json import dumps
from typing import Union, NoReturn, Optional

from flask import Flask
from flask.testing import FlaskClient
from flask.wrappers import Response

from backend.config import TestingConfig
from backend.conftest import login_form_dict, register_form_dict
from backend.test.base.database import DatabaseBase
from backend.test.base.validators import validate_http_status


class TestingBase(DatabaseBase):
    app = None

    def init(self, app) -> NoReturn:
        self.app: Flask = app(TestingConfig)

    def assert_match(self, value, expected) -> NoReturn:
        assert value == expected

    def assert_true(self, value) -> NoReturn:
        self.assert_match(value, True)

    def assert_false(self, value) -> NoReturn:
        self.assert_match(value, False)

    def assert_dicts(self, dictionary: dict, expected: dict) -> NoReturn:
        dict_dumped: str = dumps(dictionary, sort_keys=True, default=str)
        excpected_dumped: str = dumps(expected, sort_keys=True, default=str)
        assert dict_dumped == excpected_dumped

    def assert_has_keys(self, dictionary: dict, keys: Union[list, str]) -> NoReturn:
        dict_keys: list = dictionary.keys()
        if isinstance(keys, str):
            self.assert_true(keys in dict_keys)
        else:
            for key in keys:
                self.assert_true(key in dict_keys)


class ResourceTesting(TestingBase):
    default_headers: dict = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    client = None
    headers = None

    def init(self, app, jwt_access=True, jwt_refresh=False, db_commit=None, fav_service=None,
             fav_article=None) -> NoReturn:
        super().init(app)
        self.client: FlaskClient = self.app.test_client()
        self.headers = deepcopy(self.default_headers)

        if jwt_access or jwt_refresh:
            self.request_post(register_form_dict, url='/user/register')
            response: dict = self.request_post(login_form_dict, url='/user/login')
            if jwt_refresh:
                self.headers['Authorization'] = 'Bearer {refresh}'.format(refresh=response['refresh_token'])
            elif jwt_access:
                self.headers['Authorization'] = 'Bearer {access}'.format(access=response['access_token'])
        if db_commit:
            if isinstance(db_commit, list):
                [self.db_add_with_commit(el) for el in db_commit]
            else:
                self.db_add_with_commit(db_commit)
        if fav_service:
            self.request_post(fav_service, url='/add_fav_service')
        if fav_article:
            self.request_post(fav_article, url='/add_fav_article')

    @property
    def url(self) -> NoReturn:
        raise NotImplementedError

    def get(self, headers: dict, url: str) -> Response:
        return self.client.get(url, headers=headers)

    def post(self, request: dict, headers: dict, url: str) -> Response:
        return self.client.post(url, headers=headers, data=request)

    def request_get(self, headers: Optional[dict] = None, url: Optional[str] = None) -> Union[list, dict]:
        response: Response = self.get({**self.headers, **(headers or {})}, url or self.url)
        validate_http_status(response.status_code)
        return response.json

    def request_post(self, request: dict, headers: Optional[dict] = None, url: Optional[str] = None) -> Union[
        list, dict]:
        response: Response = self.post(request, {**self.headers, **(headers or {})}, url or self.url)
        validate_http_status(response.status_code)
        return response.json
