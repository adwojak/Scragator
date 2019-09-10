from base64 import b64encode
from datetime import datetime
from typing import Dict


class CompareArticleModel(object):

    def __init__(self, article_id: str, title: str, url: str, author: str, upload_date: datetime) -> None:
        self._article_id = article_id
        self._title = title
        self._url = url
        self._author = author
        self._upload_date = upload_date
        self._compare_hash = self._set_compare_hash()

    def get_article_id(self) -> str:
        return self._article_id

    def get_url(self) -> str:
        return self._url

    def get_title(self) -> str:
        return self._title

    def get_author(self) -> str:
        return self._author

    def get_upload_date(self) -> datetime:
        return self._upload_date

    def get_compare_hash(self) -> bytes:
        return self._compare_hash

    def _set_compare_hash(self) -> bytes:
        data_to_encode = '{title}-{date}-{author}'.format(
            title=self._title, date=self._upload_date, author=self._author)
        return b64encode(data_to_encode.encode('utf-8'))


class ArticleModel(CompareArticleModel):

    def __init__(self, article_id: str, title: str, url: str, author: str, upload_date: datetime, content: str) -> None:
        super().__init__(article_id, title, url, author, upload_date)
        self._content = content

    def get_content(self) -> str:
        return self._content

    def get_article(self) -> Dict:
        return {
            'id': self.get_article_id(),
            'url': self.get_url(),
            'title': self.get_title(),
            'content': self.get_content(),
        }
