class BaseObserver(object):

    def __init__(self, url):
        self._url = url

    def get_url(self):
        return self._url

    def check_for_posts_updates(self):
        raise NotImplementedError

    def get_new_posts(self, articles):
        raise NotImplementedError

    def update_db_newest_hash(self, hash):
        raise NotImplementedError

    def update_db_newest_articles(self, articles):
        raise NotImplementedError

    def create_article_model_from_compare_article(self, compare_article):
        raise NotImplementedError
