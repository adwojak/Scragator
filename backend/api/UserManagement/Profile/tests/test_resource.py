from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.Profile.resource import Profile


class TestUserProfile(ResourceTesting):
    url: str = '/profile'
    resource: Profile = Profile

    def test_user_profile(self, app):
        super().init(app)
        response: dict = self.request_get()
        self.assert_dicts(response, {'favourite_articles': [], 'favourite_services': []})
