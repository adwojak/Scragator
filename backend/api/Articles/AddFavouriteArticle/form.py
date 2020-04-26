from wtforms import Form, IntegerField
from wtforms.validators import DataRequired


class AddFavouriteArticleForm(Form):
    article_id: IntegerField = IntegerField(validators=[DataRequired()])
