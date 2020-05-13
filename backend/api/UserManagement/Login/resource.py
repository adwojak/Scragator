from flask import Response, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token

from backend.services.user.user import UserService
from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Login.form import LoginForm


class LoginUser(AuthResource):

    FORM = LoginForm

    def post(self) -> Response:

        user_service: UserService = UserService()

        email: str = self.form_data['email']
        user: user_service.model = user_service.get_user(email)

        if not user:
            return jsonify({
                'form_error': 'BAD_EMAIL'
            })

        if self.verify_password(user.password, self.form_data['password']):
            return jsonify({
                'access_token': create_access_token(identity=email),
                'refresh_token': create_refresh_token(identity=email),
                'favourite_articles': user.favourite_articles,
                'favourite_services': user.favourite_services,
                'has_been_initialized': user.has_been_initialized,
                'show_fav_as_default': user.show_fav_as_default,
            })
        else:
            return jsonify({
                'form_error': 'BAD_PASSWORD'
            })
