from wtforms import StringField
from wtforms.validators import Length

from backend.libs.Forms.forms import PagerForm


class ServiceFilteredPagerForm(PagerForm):
    service: StringField = StringField(validators=[Length(max=64)])
