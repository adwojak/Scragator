from extensions import db


class ArticleDbModel(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    article_id = db.Column(db.String(128), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    url = db.Column(db.String(128), nullable=False)
    author = db.Column(db.String(64), nullable=False)
    upload_date = db.Column(db.DateTime, nullable=False)
    content = db.Column(db.Text, nullable=False)
    compare_hash = db.Column(db.String(128), nullable=False)


class LastArticleHashDbModel(db.Model):
    __tablename__ = 'last_article_hash'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    compare_hash = db.Column(db.String(128), nullable=False)
