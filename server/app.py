from flask import Flask, request, make_response, abort, jsonify, session, redirect
from sqlalchemy import func

# from flask_cors import CORS

from sqlalchemy.exc import IntegrityError

from config import app, db, CORS, os

CORS(app)

from models import User, Game

YOUR_DOMAIN = 'http://127.0.0.1:5555'
LOCAL_DOMAIN = 'http://localhost:4000'

app.config.from_object('config')

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

# app.config.from_pyfile('config.py')
# secret_key = app.config['SECRET_KEY']
# app.config['SESSION_TYPE'] = 'null'

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
                id_hash=form_data['email'] + form_data['firstName'] + form_data['lastName'],
                password_hash=form_data['password'],
                first_name=form_data['firstName'],
                last_name=form_data['lastName'],
                ip = request.remote_addr
            )
            db.session.add(new_user)
            db.session.commit()

            

            # new_user_dict = new_user.to_dict()
            response = make_response(new_user.to_dict(), 201)
            # session['user_id'] = new_user.email
            # response.set_cookie('user_id', new_user.email)

        except IntegrityError as e:
            print({'error': 'Could not create new user'})
            db.session.rollback()  # Rollback the transaction
            response = make_response({'error': 'Could not create new user'}, 404)
            abort(400, description="Email already exists or other database error.")
    
    return response

@app.route('/login', methods=['POST', 'GET'])
def login():
    response = None
    if request.method == 'POST':
        print("Logging in user...")
        try:
            form_data = request.get_json()
            email = form_data['email']
            password = form_data['password']

            user = User.query.filter(User.email == email).one_or_none()
            if user is not None:
                updated_ip = request.remote_addr
                user.ip = updated_ip
                db.session.commit()

            if user and user.authenticate(password):
                response = make_response(user.to_dict(rules=('-games',)), 200)

        except:
            response = make_response({"error": "Unable to authenticate user login."}, 404)
            
    if response is None:
        response = make_response({"error": "Invalid request."}, 400)

    return response

@app.route('/check-session', methods=['POST'])
def check_session():
    if request.method == 'POST':
        try:
            form_data = request.get_json()
            user_id_hash = form_data['_id_hash']
            user = User.query.filter(User._id_hash == user_id_hash).one_or_none()
            if user is not None:
                updated_ip = request.remote_addr
                user.ip = updated_ip
                db.session.commit()
            response = make_response(user.to_dict(), 200)
        
        except:
            response = make_response({'error': 'could not login user from _id_hash'}, 404)

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
            for game in user_games:
                if game.win == True:
                    total_wins += 1
                    total_guesses += game.guesses
                if game.win == False:
                    total_losses += 1
                total_score += game.percent_score
            if total_score != 0 and total_games != 0:
                average_score = total_score / total_games
            else:
                average_score = 0
            average_guesses = 0
            if total_wins:
                average_guesses = total_guesses / total_wins
                total_losses = total_games - total_wins
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

@app.route('/global-stats', methods=['GET'])
def global_stats():
    if request.method == 'GET':
        try:
            average_percent_score_query = db.session.query(func.avg(Game.percent_score)).scalar()
            if average_percent_score_query is not None:
                average_percent_score = float(average_percent_score_query)
            else:
                average_percent_score = 0.0
            
            total_games_query = db.session.query(func.count(Game.id)).scalar()
            if total_games_query is not None:
                total_games_played = int(total_games_query)
            else:
                total_games_played = 0
            
            total_wins_query = db.session.query(func.count(Game.id)).filter(Game.win == True).scalar()
            if total_wins_query is not None:
                total_wins = int(total_wins_query)
            else:
                total_wins = 0
            
            average_guesses_query = db.session.query(func.avg(Game.guesses)).filter(Game.win == True).scalar()
            if average_guesses_query is not None:
                average_guesses = float(average_guesses_query)
            else:
                average_guesses = 0

            top_winners_query = (
                db.session.query(
                    User.first_name,
                    func.substr(User.last_name, 1, 1).label('last_name_initial'),  # Extract the first letter of last name
                    Game.user_id,
                    func.count().label('win_count')
                )
                .filter(Game.win == True)
                .join(User, User.id == Game.user_id)
                .group_by(Game.user_id, User.first_name, User.last_name)
                .order_by(func.count().desc())
                .limit(5)  # Limit to the top 5 winners
                .all()  # Retrieve all top winners as a list
            )
            
            win_leaders = []
            
            for row in top_winners_query:
                user_first_name = row[0]
                last_name_initial = row[1]
                # user_id_with_most_wins = row[2]
                wins_leader_count = row[3]

                # Combine first name and last name initial
                wins_leader_name = user_first_name + ' ' + last_name_initial

                win_leaders.append({
                    'name': wins_leader_name,
                    # 'user_id_with_most_wins': user_id_with_most_wins,
                    'count': wins_leader_count
                })
                
            top_users_by_games_query = (
                db.session.query(
                    User.id.label('user_id'),
                    User.first_name,
                    User.last_name,
                    func.count().label('total_games_count')
                )
                .join(
                    Game,
                    (User.id == Game.user_id),
                    isouter=True  # Use isouter=True to handle users with no games
                )
                .group_by(User.id, User.first_name, User.last_name)
                .order_by(func.count().desc())
                .limit(5)  # Limit to the top 5 users with the most total games
                .all()  # Retrieve all top users as a list
            )
            
            games_played_leaders = []
            
            for row in top_users_by_games_query:
                user_id = row[0]
                user_first_name = row[1]
                user_last_name = row[2]
                total_games_count = row[3]

                games_played_leaders.append({
                    'user_id': user_id,
                    'name': user_first_name + ' ' + user_last_name,
                    'count': total_games_count
                })

            users_with_at_least_10_games = (
                db.session.query(
                    User.id.label('user_id'),
                    func.count().label('total_games_count')
                )
                .join(Game, User.id == Game.user_id)
                .group_by(User.id)
                .having(func.count() >= 10)
                .subquery()
            )

            # Query to calculate the average "percent_score" for users with at least 10 games
            average_score_leaders_query = (
                db.session.query(
                    User.first_name,
                    func.substr(User.last_name, 1, 1).label('last_name_initial'),  # Extract the first letter of last name
                    func.avg(Game.percent_score).label('average_percent_score')
                )
                .join(users_with_at_least_10_games, User.id == users_with_at_least_10_games.c.user_id)
                .join(Game, User.id == Game.user_id)
                .group_by(User.first_name, User.last_name)
                .order_by(func.avg(Game.percent_score).desc())
                .limit(5)  # Limit to the top 5 users with the highest average percent_score
                .all()  # Retrieve all top users as a list
            )

            average_score_leaders = []

            for row in average_score_leaders_query:
                user_first_name = row[0]
                user_last_name = row[1]
                user_average_percent_score = row[2]

                average_score_leaders.append({
                    'name': user_first_name + ' ' + user_last_name,
                    'count': user_average_percent_score
                })
            response = make_response({'total_games_played': total_games_played, 'average_score': average_percent_score, 'total_wins': total_wins, 'average_guesses': average_guesses, 'win_leaders': win_leaders, 'games_played_leaders': games_played_leaders, 'average_score_leaders': average_score_leaders}, 200)
        
        except IntegrityError as e:
            print({'error': 'Could not retrieve global stats data'}, 404)
            db.session.rollback()
            response = make_response({'error': 'Could not retrieve global stats data.'}, 404)
            abort(400, description='Error in retrieving global stats data.')
            # for game in all_games:

    return response


if __name__ == '__main__':
    app.run()
    # if os.environ.get("FLASK_ENV") == "production":
    #     app.run()
    # else:
    #     app.run(debug=True)
    # app.run(debug=True)