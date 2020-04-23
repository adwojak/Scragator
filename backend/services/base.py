from flask_sqlalchemy import BaseQuery
from typing import NoReturn

from backend.extensions import db


class BaseService(object):

    @property
    def model(self) -> NoReturn:
        raise NotImplementedError

    def model_query(self) -> BaseQuery:
        return self.model.query

    def commit_to_db(self, commit_object):
        is_success = True
        try:
            db.session.add(commit_object)
            db.session.commit()
        except:
            is_success = False
        return is_success
