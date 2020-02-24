from os import environ, path

from requests import get as rget


class Config(object):
    BASEDIR: str = path.abspath(path.dirname(__file__))
    SECRET_KEY: str = environ.get('SECRET_KEY') or 'super-secret-key'
    SQLALCHEMY_DATABASE_URI: str = environ.get('DATABASE_URL') or 'sqlite:///' + path.join(BASEDIR, 'ScrapperDB.db')
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    JWT_SECRET_KEY: str = environ.get('JWT_SECRET_KEY') or 'jwt_secret_key'
    JWT_BLACKLIST_ENABLED: str = True
    JWT_BLACKLIST_TOKEN_CHECKS: str = ['access', 'refresh']

    JOBS: list = [
        {
            'id': 'execute_observers',
            'func': lambda: rget('http://localhost:5000/execute_observers'),
            'trigger': 'interval',
            'seconds': 60 * 5
        }
    ]
