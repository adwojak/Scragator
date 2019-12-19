from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel


class DeleteUser(Resource):

    @jwt_required
    def post(self):
        is_confirmed = request.form.get('is_confirmed')
        user = UserModel.query.filter_by(email=get_jwt_identity()).first()

        if user and bool(is_confirmed):
            user.delete_user()
            return jsonify(deleted=True)
        return jsonify(error=True)
