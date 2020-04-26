from copy import deepcopy

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

    def add_fav_articles(self, articles):
        articles = self.provide_list(articles)
        user: UserModel = self.get_logged_user()
        user_fav_articles: list = deepcopy(user.favourite_articles)
        user_fav_articles.extend(articles)
        user.favourite_articles: list = sorted(set(user_fav_articles))
        user.commit_db()

    def add_fav_services(self, services):
        services = self.provide_list(services)
        user: UserModel = self.get_logged_user()
        user_fav_services: list = deepcopy(user.favourite_services)
        user_fav_services.extend(services)
        user.favourite_services: list = sorted(set(user_fav_services))
        user.commit_db()

    def remove_fav_articles(self, articles):
        articles = self.provide_list(articles)
        user: UserModel = self.get_logged_user()
        user_fav_articles: list = deepcopy(user.favourite_articles)
        [user_fav_articles.remove(article) for article in articles]
        user.favourite_articles: list = sorted(set(user_fav_articles))
        user.commit_db()

    def remove_fav_services(self, services):
        services = self.provide_list(services)
        user: UserModel = self.get_logged_user()
        user_fav_services: list = deepcopy(user.favourite_services)
        [user_fav_services.remove(service) for service in services]
        user.favourite_services: list = sorted(set(user_fav_services))
        user.commit_db()

    def set_fav_display_as_main(self, show_fav_as_default):
        self.get_logged_user().show_fav_as_default = show_fav_as_default

    def initialize_user(self, selected_services, show_fav_as_default):
        self.add_fav_services(selected_services)
        self.set_fav_display_as_main(show_fav_as_default)

