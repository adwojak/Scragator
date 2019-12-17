from flask import Response, jsonify
from flask_restful import request

from backend.models.models import UserModel
from backend.extensions import db
from backend.libs.Resource.AuthResource import AuthResource
from backend.api.UserManagement.Register.form import RegisterForm


class RegisterUser(AuthResource):

    def get(self) -> Response:

        form = RegisterForm(request.form)

        if form.validate():
            email = form.email.data
            user = UserModel.query.filter_by(email=email).first()
            if user:
                return jsonify({
                    'user_exists': True
                })

            try:
                hashed_password = self.hash_password(form.password.data)
                new_user = UserModel(username=form.username.data, email=email, password=hashed_password)
                db.session.add(new_user)
                db.session.commit()
                return jsonify({
                    'created': True
                })
            except:  # TODO Errors handling
                return jsonify({
                    'error': True
                })
        else:
            return jsonify(form.errors)
