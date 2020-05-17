from pytest import raises

from backend.test.base.testing import TestingBase
from backend.libs.Resource.AuthResource import AuthResource
from backend.libs.Resource.FormResource import FormResource


class TestAuthResource(TestingBase):
    resource: AuthResource = AuthResource

    def test_hash_password(self):
        hashed_password: str = self.resource.__call__().hash_password('examplePassword')
        password_match: bool = self.resource.__call__().verify_password(hashed_password, 'examplePassword')
        self.assert_true(password_match)


class TestFormResource(TestingBase):
    resource: FormResource = FormResource

    def test_form_not_implemented(self):
        with raises(NotImplementedError):
            self.resource.__call__().form_data()
