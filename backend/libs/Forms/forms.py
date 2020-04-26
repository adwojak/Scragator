from wtforms import Form, IntegerField
from wtforms.validators import DataRequired


class PagerForm(Form):
    page: IntegerField = IntegerField(validators=[DataRequired()])
