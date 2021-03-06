from flask import Response, jsonify

from backend.services.user.user import UserService
from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Register.form import RegisterForm


class RegisterUser(AuthResource):

    FORM = RegisterForm

    def post(self) -> Response:

        user_service: UserService = UserService()
        email: str = self.form_data['email']
        if user_service.get_user(email):
            return jsonify({
                'user_exists': True
            })

        hashed_password: str = self.hash_password(self.form_data['password'])
        return jsonify({
            'created': user_service.create_user(email, hashed_password)
        })
