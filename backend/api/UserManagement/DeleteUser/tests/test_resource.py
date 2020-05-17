from backend.models.models import UserModel
from backend.test.base.testing import ResourceTesting
from backend.api.UserManagement.DeleteUser.resource import DeleteUser


class TestDeleteUser(ResourceTesting):
    url: str = '/user/delete_user'
    resource: DeleteUser = DeleteUser

    def test_delete_user_success(self, app):
        super().init(app)
        self.assert_true(bool(UserModel.query.first()))
        response: dict = self.request_post({'is_confirmed': True})
        self.assert_true(response['deleted'])
        self.assert_false(bool(UserModel.query.first()))

    def test_delete_user_not_confirmed(self, app):
        super().init(app)
        self.assert_true(bool(UserModel.query.first()))
        response: dict = self.request_post({'is_confirmed': False})
        self.assert_true(response['error'])
        self.assert_true(bool(UserModel.query.first()))
