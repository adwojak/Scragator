from flask import Response, jsonify
from flask_restful import request

from backend.models.models import UserModel
from backend.extensions import db
from backend.libs.Resource.AuthResource import AuthResource


class RegisterUser(AuthResource):

    def get(self) -> Response:

        username: str = request.form.get('username')
        email: str = request.form.get('email')
        password: str = request.form.get('password')

        user = UserModel.query.filter_by(email=email).first()
        if user:
            return jsonify({
                'user_exists': True
            })

        try:
            hashed_password = self.hash_password(password)
            new_user = UserModel(username=username, email=email, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({
                'created': True
            })
        except:  # TODO Errors handling
            return jsonify({
                'error': True
            })
