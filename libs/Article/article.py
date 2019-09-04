class ArticleModel(object):

    def __init__(self, id, title, url, author=None, upload_date=None, content=None):
        self.id = id
        self.title = title
        self.url = url
        self.author = author
        self.upload_date = upload_date
        self.content = content

    def get_id(self):
        return self.id

    def get_url(self):
        return self.url

    def get_title(self):
        return self.title

    def get_author(self):
        return self.author

    def get_upload_date(self):
        return self.upload_date

    def get_content(self):
        return self.content

    def get_article(self):
        return {
            'id': self.get_id(),
            'url': self.get_url(),
            'title': self.get_title(),
            'content': self.get_content(),
        }
