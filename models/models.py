from extensions import db
from typing import Dict
from base64 import b64encode


class ArticleModel(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    url = db.Column(db.String(128), nullable=False)
    author = db.Column(db.String(64), nullable=False)
    upload_date = db.Column(db.DateTime, nullable=False)
    content = db.Column(db.Text, nullable=False)
    compare_hash = db.Column(db.String(128), nullable=False)

    def set_compare_hash(self):
        data_to_encode = '{title}-{date}-{author}'.format(
            title=self.title, date=self.upload_date, author=self.author)
        return b64encode(data_to_encode.encode('utf-8'))

    def get_article(self) -> Dict:
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'author': self.author,
            'upload_date': self.upload_date,
            'content': self.content,
        }

    def save(self):
        self.compare_hash = self.set_compare_hash()
        db.session.add(self)


class LastArticleHashModel(db.Model):
    __tablename__ = 'last_article_hash'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    compare_hash = db.Column(db.String(128), nullable=False)
