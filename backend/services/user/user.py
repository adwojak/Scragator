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
        user: UserModel = self.model.__call__(email=email, password=hashed_password)
        return self.commit_to_db(user)

    def get_fav_services(self):
        return self.get_logged_user().favourite_services

    def get_fav_articles(self):
        return self.get_logged_user().favourite_articles

    def add_fav_services(self, services_list):
        user: UserModel = self.get_logged_user()
        user.favourite_services.extend(services_list)
        user.commit_db()

    def set_fav_display_as_main(self, show_fav_as_default):
        self.get_logged_user().show_fav_as_default = show_fav_as_default

    def initialize_user(self, selected_services, show_fav_as_default):
        self.add_fav_services(selected_services)
        self.set_fav_display_as_main(show_fav_as_default)

