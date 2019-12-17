from wtforms import Form, StringField, PasswordField, validators
from wtforms.fields.html5 import EmailField


class RegisterForm(Form):
    username = StringField('Username', [validators.Length(min=3, max=64)])
    email = EmailField('Email', [validators.DataRequired(), validators.Length(min=5, max=64), validators.Email()])
    password = PasswordField('Password', [validators.DataRequired(),
                                          validators.Length(min=6, max=32),
                                          validators.EqualTo('password_confirm', message="Password must match")])
    password_confirm = PasswordField('Repeat password')
