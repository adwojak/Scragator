from typing import NoReturn

from backend.models.models import UserModel
from backend.test.base.testing import TestingBase


class TestUserModel(TestingBase):
    def test_create_user(self, app, user) -> NoReturn:
        super().init_test(app)
        self.db_add_with_commit(user)
        db_user: UserModel = UserModel.query.first()
        self.assert_match(db_user.id, 1)
        self.assert_match(db_user.email, 'example@email.com')
        self.assert_match(db_user.favourite_articles, [])
        self.assert_match(db_user.favourite_services, [])
        self.assert_match(db_user.has_been_initialized, False)
        self.assert_match(db_user.show_fav_as_default, False)

    def test_commit_db(self, app, user) -> NoReturn:
        super().init_test(app)
        self.db_add(user)
        user.commit_db()
        self.assert_match(UserModel.query.first().email, 'example@email.com')

    def test_delete_user(self, app, user) -> NoReturn:
        super().init_test(app)
        self.db_add_with_commit(user)
        UserModel.query.first().delete_user()
        self.assert_match(UserModel.query.first(), None)
