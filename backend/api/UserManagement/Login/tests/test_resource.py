from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.Login.resource import LoginUser


class TestLogin(ResourceTesting):
    url: str = '/user/login'
    resource: LoginUser = LoginUser

    def test_login_user(self, app, register_form, login_form):
        super().init(app, jwt_access=False)
        self.request_post(register_form, url='/user/register')
        response = self.request_post(login_form)
        self.assert_true('access_token' in response.keys())

    def test_no_user(self, app, login_form):
        super().init(app, jwt_access=False)
        response = self.request_post(login_form)
        self.assert_match(response['form_error'], 'BAD_EMAIL')

    def test_bad_password(self, app, register_form):
        super().init(app, jwt_access=False)
        self.request_post(register_form, url='/user/register')
        response = self.request_post({'email': 'example@email.com', 'password': 'wrongPassword'})
        self.assert_match(response['form_error'], 'BAD_PASSWORD')
