from backend.test.base.testing import ResourceTesting


class TestRegister(ResourceTesting):
    url: str = '/services'

    def test_register_user(self, app, article):
        super().init_test(app)
        self.db_add_with_commit(article)
        asd = self.request_post(request={'page': 1})
        # import pdb;pdb.set_trace()
        # asdd = self.request_get()
        # import pdb;pdb.set_trace()
