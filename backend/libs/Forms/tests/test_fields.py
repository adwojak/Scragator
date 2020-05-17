from wtforms import Form, IntegerField
from werkzeug.datastructures import ImmutableMultiDict

from backend.libs.Forms.fields import ArrayFieldList
from backend.test.base.testing import TestingBase


class ExampleForm(Form):
    example_field = ArrayFieldList(IntegerField('Example'))


class TestArrayField(TestingBase):

    def test_array_field_list(self):
        # form = ExampleForm(ImmutableMultiDict([('example_field[0]', 1)]))
        pass
