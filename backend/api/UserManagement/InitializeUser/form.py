from wtforms import Form, FieldList, BooleanField, StringField


class InitializeUserForm(Form):
    selected_services: FieldList = FieldList(StringField('Service'))  # TODO Need to be tested with frontend
    show_fav_as_default: BooleanField = BooleanField()
