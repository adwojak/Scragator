from datetime import datetime

from backend.models.models import ArticleModel
from backend.scrappers.names import ScrapperNames
from backend.test.base.testing import TestingBase


class TestArticleModel(TestingBase):
    def test_create_article(self, app, article):
        super().init(app)
        self.db_add_with_commit(article)
        db_article = ArticleModel.query.first()
        # 79%
        self.assert_match(db_article.id, 1)
        self.assert_match(db_article.name, ScrapperNames.NIEBEZPIECZNIK.name)
        self.assert_match(db_article.title, 'Article title')
        self.assert_match(db_article.url, 'articleurl.com/asd')
        self.assert_match(db_article.author, 'Article author')
        self.assert_match(db_article.upload_date, datetime(2020, 4, 22, 11, 31))
        self.assert_match(db_article.hash,
                          'TklFQkVaUElFQ1pOSUstMjAyMC0wNC0yMiAxMTozMTowMC1BcnRpY2xlIGF1dGhvci1hcnRpY2xldXJsLmNvbS9hc2Q=')

    def test_get_article(self, app, article):
        super().init(app)
        self.db_add_with_commit(article)
        db_article = ArticleModel.query.first()
        article_structure = {
            'id': 1,
            'url': 'articleurl.com/asd',
            'title': 'Article title',
            'name': 'NIEBEZPIECZNIK',
            'author': 'Article author',
            'upload_date': datetime(2020, 4, 22, 11, 31),
            'hash': 'TklFQkVaUElFQ1pOSUstMjAyMC0wNC0yMiAxMTozMTowMC1BcnRpY2xlIGF1dGhvci1hcnRpY2xldXJsLmNvbS9hc2Q='
        }
        self.assert_dicts(db_article.get_article(), article_structure)

    def test_save_article(self, app, article):
        super().init(app)
        article.save()
        self.db_commit()
        db_article = ArticleModel.query.first()
        self.assert_match(db_article.title, 'Article title')

    def test_exist(self, app, article):
        super().init(app)
        self.db_add_with_commit(article)
        db_article = ArticleModel.query.first()
        self.assert_match(db_article.exist(), True)
