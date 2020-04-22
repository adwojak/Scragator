from flask import Response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.services.user.user import UserService


class DeleteUser(Resource):

    @jwt_required
    def post(self) -> Response:
        is_confirmed: str = request.form.get('is_confirmed')
        user_service: UserService = UserService()
        user: user_service.model = user_service.get_logged_user()

        if user and bool(is_confirmed):
            user.delete_user()
            return jsonify(deleted=True)
        return jsonify(error=True)
