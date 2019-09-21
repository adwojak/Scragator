from base64 import b64encode
from typing import Dict

from extensions import db


class ArticleModel(db.Model):
    __tablename__ = 'articles'
    name = db.Column(db.String(128), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    url = db.Column(db.String(128), nullable=False)
    author = db.Column(db.String(64), nullable=False)
    upload_date = db.Column(db.DateTime, nullable=False)
    content = db.Column(db.Text, nullable=False)
    hash = db.Column(db.String(512), nullable=False, primary_key=True)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.hash = self.set_hash()

    def set_hash(self):
        data_to_encode = '{name}-{title}-{date}-{author}'.format(
            name=self.name, title=self.title, date=self.upload_date, author=self.author)
        return b64encode(data_to_encode.encode('utf-8'))

    def get_article(self) -> Dict:
        return {
            'url': self.url,
            'title': self.title,
            'author': self.author,
            'upload_date': self.upload_date,
            'content': self.content,
            'hash': str(self.hash)
        }

    def save(self):
        db.session.add(self)

    def exist(self):
        return self.query.filter_by(hash=self.hash).scalar() is not None
