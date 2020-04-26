from wtforms import Form, BooleanField
from wtforms.validators import DataRequired


class DeleteUserForm(Form):
    is_confirmed: BooleanField = BooleanField(validators=[DataRequired()])
