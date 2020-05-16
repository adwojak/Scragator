from wtforms import Form
from wtforms.validators import DataRequired

from backend.libs.Forms.fields import BooleanField


class DeleteUserForm(Form):
    is_confirmed: BooleanField = BooleanField(validators=[DataRequired()])
