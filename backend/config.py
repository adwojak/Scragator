from os import environ, path

from requests import get as rget


class Config(object):
    BASEDIR: str = path.abspath(path.dirname(__file__))
    SECRET_KEY: str = environ.get('SECRET_KEY') or 'super-secret-key'
    SQLALCHEMY_DATABASE_URI: str = environ.get('DATABASE_URL') or 'sqlite:///' + path.join(BASEDIR, 'ScrapperDB.db')
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False

    JOBS: list = [
        {
            'id': 'execute_observers',
            'func': lambda: rget('http://localhost:5000/execute_observers'),
            'trigger': 'interval',
            'seconds': 159999
        }
    ]