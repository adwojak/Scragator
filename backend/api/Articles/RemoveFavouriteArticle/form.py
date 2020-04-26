from wtforms import Form, IntegerField
from wtforms.validators import DataRequired


class RemoveFavouriteArticleForm(Form):
    article_id: IntegerField = IntegerField(validators=[DataRequired()])
