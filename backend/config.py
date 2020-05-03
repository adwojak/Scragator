from os import environ, path

from requests import get as rget


class Config(object):
    # Base paths
    ENV_DATABASE_URL: str = environ.get('DATABASE_URL')
    ENV_SQLITE_DB_NAME = environ.get('SQLITE_DB_NAME')
    ENV_SECRET_KEY: str = environ.get('SECRET_KEY')
    ENV_JWT_SECRET_KEY: str = environ.get('JWT_SECRET_KEY')
    BASEDIR: str = path.abspath(path.dirname(__file__))
    SQL_DB_URI: str = 'sqlite:///{basedir}{sqlite_db_name}'.format(basedir=BASEDIR, sqlite_db_name=ENV_SQLITE_DB_NAME)
    JWT_ACCESS: str = 'access'
    JWT_REFRESH: str = 'refresh'

    SECRET_KEY: str = ENV_SECRET_KEY or 'super-secret-key'
    SQLALCHEMY_DATABASE_URI: str = ENV_DATABASE_URL or SQL_DB_URI
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    JWT_SECRET_KEY: str = ENV_JWT_SECRET_KEY or 'jwt_secret_key'
    JWT_BLACKLIST_ENABLED: str = True
    JWT_BLACKLIST_TOKEN_CHECKS: str = [JWT_ACCESS, JWT_REFRESH]

    JOBS: list = [
        {
            'id': 'execute_observers',
            'func': lambda: rget('http://localhost:5000/execute_observers'),
            'trigger': 'interval',
            'seconds': 60 * 5
        }
    ]


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI: str = 'postgresql:///scragatorTest'  # TODO TMP
    DEBUG = True
    TESTING = True
