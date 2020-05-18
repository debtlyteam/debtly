from flask import Flask
from routes.user import userRoutes
from flask_login import LoginManager
import mongoengine
from database.interface import get_user

from datetime import timedelta

mongoengine.connect('debtly')
app = Flask(__name__)

# TODO: setup up config file
# !!! SECRET KEY MUST BE UNIQUE IN PRODUCTION !!!
app.secret_key = b'_8H@jhAsDFh9kjd((!jf'
# app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
# DEBUG
app.config['SESSION_COOKIE_SECURE'] = False # TODO: switch to True in production!!!
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=2) # 1 minute timeout for testing

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return get_user(id_str=user_id)

login_manager.init_app(app)

app.register_blueprint(userRoutes)
