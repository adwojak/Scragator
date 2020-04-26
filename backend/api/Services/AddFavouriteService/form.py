from wtforms import Form, StringField
from wtforms.validators import Length


class AddFavouriteServiceForm(Form):
    service_name: StringField = StringField(validators=[Length(max=64)])
