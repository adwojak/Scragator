from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
from flask_jwt_extended import JWTManager

db: SQLAlchemy = SQLAlchemy()
migrate: Migrate = Migrate()
scheduler: APScheduler = APScheduler()
jwt: JWTManager = JWTManager()
