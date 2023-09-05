import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

from flask_bcrypt import Bcrypt

from dotenv import load_dotenv

load_dotenv()

import secrets

app = Flask(__name__)
# SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = secrets.token_hex(32)

# SECRET_KEY = app.secret_key

db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate

bcrypt = Bcrypt(app)

api = Api(app)

CORS(app)