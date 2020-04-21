from flask_sqlalchemy import BaseQuery
from typing import NoReturn


class BaseService(object):

    @property
    def model(self) -> NoReturn:
        raise NotImplementedError

    def model_query(self) -> BaseQuery:
        return self.model.query

