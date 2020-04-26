from wtforms import Form, PasswordField
from wtforms.validators import DataRequired, Length, Email
from wtforms.fields.html5 import EmailField


class LoginForm(Form):
    email: EmailField = EmailField('Email', [DataRequired(), Length(min=3, max=64), Email()])
    password: EmailField = PasswordField('Password', [DataRequired(), Length(min=6, max=32)])
