from backend.models.models import UserModel
from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.Register.resource import RegisterUser


class TestRegister(ResourceTesting):
    url: str = '/user/register'
    resource: RegisterUser = RegisterUser

    def test_register_user(self, app, register_form):
        super().init(app, jwt_access=False)
        response = self.request_post(register_form)
        user: UserModel = UserModel.query.first()
        self.assert_true(response['created'])
        self.assert_match(user.email, register_form['email'])

    def test_user_exists(self, app, user, register_form):
        super().init(app, jwt_access=False)
        self.db_add_with_commit(user)
        response: dict = self.request_post(register_form)
        self.assert_true(response['user_exists'])
