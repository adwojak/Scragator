from wtforms import Form, StringField, BooleanField

from backend.libs.Forms.fields import ArrayFieldList


class InitializeUserForm(Form):
    selected_services: ArrayFieldList = ArrayFieldList(StringField('Service'))
    show_fav_as_default: BooleanField = BooleanField()
