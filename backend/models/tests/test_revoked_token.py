from backend.models.models import RevokedTokenModel
from backend.test.base.testing import TestingBase


class TestRevokedTokenModel(TestingBase):
    def test_model(self, app, revoked_token):
        super().init_test(app)
        revoked_token.add()
        db_revoked_token = RevokedTokenModel.query.first()
        self.assert_match(db_revoked_token.jti, 'examplejti')

    def test_is_jti_blacklisted(self, app, revoked_token):
        super().init_test(app)
        revoked_token.add()
        db_revoked_token = RevokedTokenModel.query.first()
        self.assert_match(db_revoked_token.is_jti_blacklisted('examplejti'), True)

    def test_is_jti_not_blacklisted(self, app, revoked_token):
        super().init_test(app)
        revoked_token.add()
        db_revoked_token = RevokedTokenModel.query.first()
        self.assert_match(db_revoked_token.is_jti_blacklisted('anotherexamplejti'), False)
