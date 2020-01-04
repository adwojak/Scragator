from flask_apscheduler import APScheduler
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db: SQLAlchemy = SQLAlchemy()
migrate: Migrate = Migrate()
scheduler: APScheduler = APScheduler()
