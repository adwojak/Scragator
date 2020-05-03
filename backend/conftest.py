from pytest import fixture

from backend.models.models import UserModel
from backend.test.config import app


@fixture
def new_user():
    return UserModel(
        email='newuser@mail.com',
        password='3515687c045a1fe0eee41f0b6c660568c73556eeddef7b4cf2748b165ff9955b6be46867c91a07b4c356947fc0831625472c0e2d2332c37995681496086d1b355b94aaae98f90cb21b64540ecf31e4d66e914f698c644054146cf5083150cb10'
    )
