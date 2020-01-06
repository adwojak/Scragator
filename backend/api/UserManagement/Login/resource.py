from flask import Response, jsonify
from flask_restful import request
from flask_jwt_extended import create_access_token, create_refresh_token

from backend.models.models import UserModel
from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Login.form import LoginForm


class LoginUser(AuthResource):

    def post(self) -> Response:

        form: LoginForm = LoginForm(request.form)

        if form.validate():
            email: str = form.email.data
            user: UserModel = UserModel.query.filter_by(email=email).first()

            if not user:
                return jsonify({
                    'form_error': 'BAD_EMAIL'
                })

            if self.verify_password(user.password, form.password.data):
                return jsonify({
                    'access_token': create_access_token(identity=email),
                    'refresh_token': create_refresh_token(identity=email)
                })
            else:
                return jsonify({
                    'form_error': 'BAD_PASSWORD'
                })
        else:
            return jsonify(form.errors)
