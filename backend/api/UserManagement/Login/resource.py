from flask import Response, jsonify
from flask_restful import request
from flask_jwt_extended import create_access_token, create_refresh_token

from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Login.form import LoginForm
from backend.services.user.user import UserService


class LoginUser(AuthResource):

    def post(self) -> Response:

        form: LoginForm = LoginForm(request.form)
        user_service: UserService = UserService()

        if form.validate():
            email: str = form.email.data
            user: user_service.model = user_service.get_user(email)

            if not user:
                return jsonify({
                    'form_error': 'BAD_EMAIL'
                })

            if self.verify_password(user.password, form.password.data):
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
        else:
            return jsonify(form.errors)
