from extensions import db


# These models would be created automatically for every object of Observer class (e.g. Niebezpiecznik
# has own tables called 'NiebezpiecznikArticles' and 'NiebezpiecznikLastArticle'
class ArticleModel(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)


class LastArticle(db.Model):
    __tablename__ = 'last_article'
    id = db.Column(db.Integer, primary_key=True)
