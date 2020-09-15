from backend.test.base.testing import ServiceTesting
from backend.services.user.user import UserService


class TestUserService(ServiceTesting):
    SERVICE = UserService

    def test_get_user(self, app, user):
        super().init(app, user)
        assert bool(self.service.get_user(user.email)) is True

    # def test_get_logged_user(self, app):
    #     super().init(app)
    #     self.service.get_logged_user()

    def test_create_user(self, app, register_form):
        super().init(app)
        assert self.service.create_user(email=register_form['email'], hashed_password=register_form['password']) is True
