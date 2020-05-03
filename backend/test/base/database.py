from backend.extensions import db


class DatabaseBase(object):
    def db_add(self, element):
        db.session.add(element)

    def db_commit(self):
        db.session.commit()

    def db_add_with_commit(self, element):
        self.db_add(element)
        self.db_commit()
