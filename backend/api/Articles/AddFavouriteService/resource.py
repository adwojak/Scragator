from copy import deepcopy
from flask import jsonify, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend.models.models import UserModel


class AddFavouriteService(Resource):

    @jwt_required
    def post(self):
        service_name = request.form.get('service_name')
        user = UserModel.query.filter_by(email=get_jwt_identity()).first()

        if user and service_name and service_name not in user.favourite_services:
            user_fav_services = deepcopy(user.favourite_services)
            user_fav_services.append(service_name)
            user.favourite_services = user_fav_services
            user.commit_db()
            return jsonify({
                'success': True
            })
        return jsonify({
            'error': True
        })
