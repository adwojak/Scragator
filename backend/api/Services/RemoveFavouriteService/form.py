from wtforms import Form, StringField
from wtforms.validators import Length


class RemoveFavouriteServiceForm(Form):
    service_name: StringField = StringField(validators=[Length(max=64)])
