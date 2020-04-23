from flask import Response, jsonify
from flask_restful import request

from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Register.form import RegisterForm
from backend.services.user.user import UserService


class RegisterUser(AuthResource):

    def post(self) -> Response:

        form: RegisterForm = RegisterForm(request.form)
        user_service: UserService = UserService()

        if form.validate():
            email: str = form.email.data
            if user_service.get_user(email):
                return jsonify({
                    'user_exists': True
                })

            try:
                hashed_password: str = self.hash_password(form.password.data)
                user_service.create_user(email, hashed_password)
                return jsonify({
                    'created': True
                })
            except:  # TODO Errors handling
                return jsonify({
                    'error': True
                })
        else:
            return jsonify(form.errors)
