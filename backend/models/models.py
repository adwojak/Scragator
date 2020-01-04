from base64 import b64encode
from typing import Any

from backend.extensions import db


class ArticleModel(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(512), nullable=False)
    title = db.Column(db.String(512), nullable=False)
    url = db.Column(db.String(512), nullable=False)
    author = db.Column(db.String(128), nullable=False)
    upload_date = db.Column(db.DateTime, nullable=False)
    hash = db.Column(db.String(512), nullable=False)

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.hash: bytes = self.set_hash()

    def set_hash(self) -> bytes:
        data_to_encode = '{name}-{date}-{author}-{url}'.format(
            name=self.name, date=self.upload_date, author=self.author, url=self.url)
        return b64encode(data_to_encode.encode('utf-8')).decode('utf-8')

    def get_article(self) -> dict:
        return {
            'url': self.url,
            'title': self.title,
            'author': self.author,
            'upload_date': self.upload_date,
            'hash': str(self.hash)
        }

    def save(self) -> None:
        db.session.add(self)

    def exist(self) -> bool:
        return self.query.filter_by(hash=self.hash).scalar() is not None


class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(512), nullable=False)
    favourite_articles = db.Column(db.ARRAY(db.Integer), default=[])
    favourite_services = db.Column(db.ARRAY(db.String), default=[])

    def commit_db(self):
        db.session.commit()

    def delete_user(self):
        self.query.delete()
        self.commit_db()


class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)
