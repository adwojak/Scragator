from flask import Response, jsonify
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService
from backend.libs.Resource.FormResource import FormResource
from backend.api.UserManagement.InitializeUser.form import InitializeUserForm


class InitializeUser(FormResource):
    FORM = InitializeUserForm

    @jwt_required
    def post(self) -> Response:
        user_service: UserService = UserService()
        try:
            user_service.initialize_user(self.form_data.get('selected_services'),
                                         self.form_data.get('show_fav_as_default'))
            return jsonify({
                'success': True
            })
        except:
            return jsonify(error=True)
