from flask import request
from flask_restful import Resource
from wtforms import ValidationError


class FormResource(Resource):

    @property
    def FORM(self):
        raise NotImplementedError

    @property
    def form(self):
        return self.FORM(request.form)

    @property
    def is_form_validated(self):
        return self.form.validate()

    @property
    def form_data(self):
        if self.is_form_validated:
            return self.form.data
        raise ValidationError()
