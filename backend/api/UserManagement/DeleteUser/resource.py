from flask import Response, jsonify
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService
from backend.libs.Resource.FormResource import FormResource
from backend.api.UserManagement.DeleteUser.form import DeleteUserForm


class DeleteUser(FormResource):

    FORM = DeleteUserForm

    @jwt_required
    def post(self) -> Response:
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

        if user and self.form_data.get('is_confirmed'):
            user.delete_user()
            return jsonify(deleted=True)
        return jsonify(error=True)
