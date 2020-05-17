from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.Logout.resource import AccessTokenLogout, RefreshTokenLogout


class TestRefreshTokenLogout(ResourceTesting):
    url: str = '/user/logout_refresh'
    resource: RefreshTokenLogout = RefreshTokenLogout

    def test_token_refresh_logout_success(self, app):
        super().init(app, jwt_refresh=True)
        response: dict = self.request_post({})
        self.assert_true(response['refresh_token_logout'])


class TestAccessTokenLogout(ResourceTesting):
    url: str = '/user/logout_access'
    resource: AccessTokenLogout = AccessTokenLogout

    def test_token_access_logout_success(self, app):
        super().init(app)
        response: dict = self.request_post({})
        self.assert_true(response['access_token_logout'])
