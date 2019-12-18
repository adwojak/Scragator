from wtforms import Form, PasswordField, validators
from wtforms.fields.html5 import EmailField


class LoginForm(Form):
    email = EmailField('Email', [validators.DataRequired(), validators.Length(min=3, max=64), validators.Email()])
    password = PasswordField('Password', [validators.DataRequired(), validators.Length(min=6, max=32)])
