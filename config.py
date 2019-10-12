from os import environ, path

from dotenv import load_dotenv
from requests import get as rget


class Config(object):
    BASEDIR = path.abspath(path.dirname(__file__))
    SECRET_KEY = environ.get('SECRET_KEY') or 'super-secret-key'
    SQLALCHEMY_DATABASE_URI = environ.get(
        'DATABASE_URL') or 'sqlite:///' + path.join(BASEDIR, 'ScrapperDB.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    load_dotenv(path.join(path.dirname(__file__), '.env'))

    JOBS = [
        {
            'id': 'execute_observers',
            'func': lambda: rget('http://localhost:5000/execute_observers'),
            'trigger': 'interval',
            'seconds': 10
        }
    ]
