from typing import NoReturn

from flask_sqlalchemy import BaseQuery

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

    def provide_list(self, elements):
        if type(elements) != list:
            return [elements]
        return elements
