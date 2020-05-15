from typing import Any, NoReturn

from backend.extensions import db as database


class DatabaseBase(object):
    db = database

    def db_add(self, element: Any) -> NoReturn:
        self.db.session.add(element)

    def db_commit(self) -> NoReturn:
        self.db.session.commit()

    def db_add_with_commit(self, element: Any) -> NoReturn:
        self.db_add(element)
        self.db_commit()
