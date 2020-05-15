from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.TokenRefresh.resource import TokenRefresh


class TestTokenRefresh(ResourceTesting):
    url: str = '/user/token_refresh'
    resource: TokenRefresh = TokenRefresh

    def test_token_refresh(self, app):
        super().init(app, jwt_refresh=True)
        response: dict = self.request_post({})
        self.assert_has_keys(response, 'access_token')

