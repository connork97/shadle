from flask import Flask, request, make_response, abort, jsonify, session, redirect

from flask_cors import CORS

from sqlalchemy.exc import IntegrityError

from config import app, db

CORS(app)

from models import User

YOUR_DOMAIN = 'http://127.0.0.1:5555'
LOCAL_DOMAIN = 'http://localhost:4000'

# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_restful import Api
# from flask_bcrypt import Bcrypt

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)  # Initialize Flask-Migrate

# bcrypt = Bcrypt(app)

# api = Api(app)


@app.route('/')
def home():
    return ''

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        print('Signing up new user...')
        try:
            form_data = request.get_json()
            new_user = User(
                email=form_data['email'],
                password_hash=form_data['password'],
                first_name=form_data['firstName'],
                last_name=form_data['lastName']
            )
            db.session.add(new_user)
            db.session.commit()
            # new_user_dict = new_user.to_dict()
            response = make_response(new_user.to_dict(), 201)

        except IntegrityError as e:
            print({'error': 'Could not create new user'})
            db.session.rollback()  # Rollback the transaction
            response = make_response({'error': 'Could not create new user'}, 404)
            abort(400, description="Email already exists or other database error.")
    
    return response

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        print("Logging in user...")
        try:
            form_data = request.get_json()
            email = form_data['email']
            password = form_data['password']

            user = User.query.filter(User.email == email).one_or_none()

            if user and user.authenticate(password):
                response = make_response(user.to_dict(), 200)

        except:
            response = make_response({"error": "Unable to authenticate user login."}, 404)

    return response

if __name__ == '__main__':
    app.run(debug=True)