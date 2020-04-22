from backend.models.models import UserModel
from backend.services.base import BaseService
from flask_jwt_extended import get_jwt_identity


class UserService(BaseService):
    model: UserModel = UserModel

    def get_user(self, email):
        return self.model_query().filter_by(email=email).first()

    def get_logged_user(self):
        return self.get_user(get_jwt_identity())

    def create_user(self, email, hashed_password):
        return self.model.__call__(email=email, password=hashed_password)
