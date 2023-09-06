from config import db, bcrypt

from sqlalchemy import UniqueConstraint
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, time, date

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules=(
        # '-id',
        '-_password_hash',
        '-games.user',
        '-games.created_at',
        '-games.updated_at',
    )

    id = db.Column(db.Integer, primary_key=True)
    _id_hash = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    ip = db.Column(db.String)    

    games = db.relationship('Game', back_populates='user')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @hybrid_property
    def id_hash(self):
        return self._id_hash
    
    @id_hash.setter
    def id_hash(self, id):
        id_hash = bcrypt.generate_password_hash(id.encode('utf-8'))
        self._id_hash = id_hash.decode('utf-8')

    __table_args__ = (
        UniqueConstraint('email', name='unique_email_constraint'),
        UniqueConstraint('_id_hash', name='unique_id_hash_constraint')
    )
    

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    serialize_rules=(
        '-user.games',
    )

    id = db.Column(db.Integer, primary_key=True)
    rgb = db.Column(db.String)
    win = db.Column(db.Boolean)
    guesses = db.Column(db.Integer)
    percent_score = db.Column(db.Float)
    ip = db.Column(db.String)    

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='games')

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())