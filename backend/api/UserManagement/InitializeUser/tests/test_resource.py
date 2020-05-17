from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.InitializeUser.resource import InitializeUser


class TestInitializeUser(ResourceTesting):
    url: str = '/user/initialize'
    resource: InitializeUser = InitializeUser

    def test_initialize_user_success(self, app):
        super().init(app)
        response: dict = self.request_post({'selected_services': ['1'], 'show_fav_as_default': True})
        self.assert_true(response['success'])

    def test_initialize_user_services_not_selected(self, app):
        super().init(app)
        response: dict = self.request_post({'selected_services': [], 'show_fav_as_default': False})
        self.assert_true(response['success'])
