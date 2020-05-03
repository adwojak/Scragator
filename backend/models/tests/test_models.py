from backend.test.base.testing import TestingBase
from backend.models.models import UserModel


class TestExample(TestingBase):

    def test_example(self, app):
        super().init_test(app)

        zxc = UserModel(email="asd", password="asd")
        self.db_add_with_commit(zxc)
        self.assert_match(UserModel.query.first().email, 'asd')
