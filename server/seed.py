from app import app
from models import db, User

if __name__ == '__main__':
    with app.app_context():
        print("Dropping tables...")
        db.session.query(User).delete()
        db.session.commit()

        print("Adding users...")
        connor = User(
            email="connor@connor.com",
            password_hash="password",
            first_name="Connor",
            last_name="Kormos"
        )
        db.session.add(connor)
        db.session.commit()