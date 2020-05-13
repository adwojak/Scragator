from werkzeug.exceptions import Aborter, HTTPException, integer_types


class HttpStatusValidator(Aborter):
    def __call__(self, code, *args, **kwargs):
        if not args and not kwargs and not isinstance(code, integer_types):
            raise HTTPException(response=code)
        if code not in self.mapping:
            return True
        raise self.mapping[code](*args, **kwargs)


def validate_http_status(status_code, *args, **kwargs):
    return _http_status_validator(status_code, *args, **kwargs)


_http_status_validator = HttpStatusValidator()
