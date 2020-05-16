from wtforms import FieldList, BooleanField as BoolField
from wtforms.utils import unset_value


class ArrayFieldList(FieldList):
    """
    When sending CS request with array data, like selected_services: [12, 23, 34]
    SS receives it as ImmutableMultiDict([('selected_services[0]', '44'), ('selected_services[1]', '313'), ...])
    When parsing it to FieldList, field tries to receive it as selected_services-0 instead of selected_services[0]
    That's why we have to override a few methods to parse it properly
    """

    def _add_entry(self, formdata=None, data=unset_value, index=None):
        assert not self.max_entries or len(self.entries) < self.max_entries, \
            'You cannot have more than max_entries entries in this FieldList'
        if index is None:
            index = self.last_index + 1
        self.last_index = index
        name = '%s[%d]' % (self.short_name, index)
        field_id = '%s[%d]' % (self.id, index)
        field = self.unbound_field.bind(form=None, name=name, prefix=self._prefix, id=field_id, _meta=self.meta,
                                        translations=self._translations)
        field.process(formdata, data)
        self.entries.append(field)
        return field

    def _extract_indices(self, prefix, formdata):
        """
        Yield indices of any keys with given prefix.

        formdata must be an object which will produce keys when iterated.  For
        example, if field 'foo' contains keys 'foo-0-bar', 'foo-1-baz', then
        the numbers 0 and 1 will be yielded, but not neccesarily in order.
        """
        offset = len(prefix) + 1
        for k in formdata:
            if k.startswith(prefix):
                k = k[offset:offset+1].split('-', 1)[0]
                if k.isdigit():
                    yield int(k)


class BooleanField(BoolField):
    false_values = (False, 'False', 'false', '')
