from base64 import b64encode


class CompareArticleModel(object):

    def __init__(self, id, title, url, author, upload_date):
        self._id = id
        self._title = title
        self._url = url
        self._author = author
        self._upload_date = upload_date
        self._compare_hash = self._set_compare_hash()

    def get_id(self):
        return self._id

    def get_url(self):
        return self._url

    def get_title(self):
        return self._title

    def get_author(self):
        return self._author

    def get_upload_date(self):
        return self._upload_date

    def get_compare_hash(self):
        return self._compare_hash

    def _set_compare_hash(self):
        data_to_encode = '{title}-{date}-{author}'.format(
            title=self._title, date=self._upload_date, author=self._author)
        return b64encode(data_to_encode.encode('utf-8'))


class ArticleModel(CompareArticleModel):

    def __init__(self, id, title, url, author, upload_date, content):
        super().__init__(id, title, url, author, upload_date)
        self._content = content

    def get_content(self):
        return self._content

    def get_article(self):
        return {
            'id': self.get_id(),
            'url': self.get_url(),
            'title': self.get_title(),
            'content': self.get_content(),
        }
