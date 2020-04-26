from wtforms import StringField
from wtforms.validators import Length

from backend.libs.Forms.forms import PagerForm


class SearchArticlesPagerForm(PagerForm):
    search_string: StringField = StringField(validators=[Length(max=128)])
