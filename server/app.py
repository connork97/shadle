from flask import Flask, request, make_response, abort, jsonify, session, redirect
from sqlalchemy import func, text

from flask_cors import CORS

from sqlalchemy.exc import IntegrityError

from config import app, db

CORS(app)

from models import User, Game

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
                response = make_response(user.to_dict(rules=('-games',)), 200)

        except:
            response = make_response({"error": "Unable to authenticate user login."}, 404)

    return response

@app.route('/games', methods=['POST'])
def games():
    if request.method == 'POST':
        print('Posting new game results...')
        try:
            game_data = request.get_json()
            print("game data: ", game_data)
            new_game = Game(
                rgb = game_data['rgb'],
                win = bool(game_data['win']),
                guesses = game_data['guesses'],
                percent_score = game_data['percent_score'],
                user_id = game_data['user_id']
            )
            db.session.add(new_game)
            db.session.commit()
            response = make_response(new_game.to_dict(), 201)
        
        except IntegrityError as e:
            print({'error': 'Could not post new game.'})
            db.session.rollback()
            response = make_response({'error': 'Could not post new game'}, 404)
            abort(400, description='Error in posting new game.')
        
    return response

@app.route('/games_by_user/<int:id>', methods=['GET'])
def games_by_user(id):
    if request.method == 'GET':
        print('Retrieving user game history...')
        try:
            user = User.query.filter(User.id == id).one_or_none()
            user_games = user.games
            total_games = len(user_games)
            total_wins = 0
            total_losses = 0
            total_score = 0
            total_guesses = 0
            # average_score = 
            for game in user_games:
                if game.win == True:
                    total_wins += 1
                    total_guesses += game.guesses
                if game.win == False:
                    total_losses += 1
                total_score += game.percent_score
            # total_games = user.games.len()
            # total_wins = user.games.filter(Game.win == True).count()
            # average_score = user.games(func.avg(Game.percent_score)).scalar()
            # average_score_sql = text('SELECT AVG(percent_score) AS average_percent_score FROM games WHERE user_id = :id;')
            # average_score = func.avg(user.games.percent_score)
            average_score = total_score / total_games
            # average_guesses_sql = text('SELECT AVG(guesses) AS average_guesses FROM games WHERE user_id = :id;')
            average_guesses = 0
            if total_wins:
                average_guesses = total_guesses / total_wins
                total_losses = total_games - total_wins
            # average_guesses = user.games.with_entities(func.avg(Game.guesses)).scalar()
            response = make_response(
                {'total_games': total_games,
                'total_wins': total_wins,
                'total_losses': total_losses,
                'average_guesses': average_guesses,
                'average_score': average_score}
            , 200)
        
        except IntegrityError as e:
            print({'error': 'Could not retrieve user game data.'})
            db.session.rollback()
            response = make_response({'error': 'Could not retrieve user game data.'}, 404)
            abort(400, description='Error in retrieving user game data.')
    
    return response


if __name__ == '__main__':
    app.run(debug=True)