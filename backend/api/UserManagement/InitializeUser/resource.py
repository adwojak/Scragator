from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService
from backend.api.UserManagement.InitializeUser.form import InitializeUserForm


class InitializeUser(Resource):

    @jwt_required
    def post(self) -> Response:
        form_data: InitializeUserForm = InitializeUserForm(request.form).data
        user_service: UserService = UserService()
        try:
            user_service.initialize_user(form_data.get('selected_services'), form_data.get('show_fav_as_default'))
            return jsonify({
                'success': True
            })
        except:
            return jsonify(error=True)
