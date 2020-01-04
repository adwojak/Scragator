from binascii import hexlify
from flask_restful import Resource
from hashlib import pbkdf2_hmac, sha256
from os import urandom


class AuthResource(Resource):
    ASCII_ENCODE = 'ascii'
    UTF_ENCODE = 'utf-8'
    HASH_NAME = 'sha512'
    ITERATIONS = 100000

    def hash_password(self, password):
        salt = sha256(urandom(60)).hexdigest().encode(self.ASCII_ENCODE)
        pwdhash = pbkdf2_hmac(self.HASH_NAME, password.encode(self.UTF_ENCODE), salt, self.ITERATIONS)
        pwdhash = hexlify(pwdhash)
        return (salt + pwdhash).decode(self.ASCII_ENCODE)

    def verify_password(self, stored_password, provided_password):
        salt = stored_password[:64]
        stored_password = stored_password[64:]
        pwdhash = pbkdf2_hmac(self.HASH_NAME, provided_password.encode(self.UTF_ENCODE), salt.encode(self.ASCII_ENCODE),
                              self.ITERATIONS)
        pwdhash = hexlify(pwdhash).decode(self.ASCII_ENCODE)
        return pwdhash == stored_password
