from backend.test.base.testing import ResourceTesting
from backend.api.Articles.AddFavouriteArticle.resource import AddFavouriteArticle


class TestAddFavouriteArticle(ResourceTesting):
    url: str = '/add_fav_article'
    resource: AddFavouriteArticle = AddFavouriteArticle

    def test_add_favourite_article_success(self, app, article, article_dict):
        super().init(app, db_commit=article)
        response: dict = self.request_post(article_dict)
        self.assert_dicts(response, {'success': True, 'user_fav_articles': [1]})

    def test_add_favourite_article_failure(self, app, article, article_dict):
        super().init(app, db_commit=article, fav_article=article_dict)
        response: dict = self.request_post(article_dict)
        self.assert_true(response['error'])
