from flask import Flask
from routes.user import userRoutes
from routes.group import groupRoutes
from routes.ledger import ledgerRoutes
from flask_login import LoginManager
import mongoengine
from database.interface import get_user

from datetime import timedelta

mongoengine.connect('debtly')
app = Flask(__name__)

# TODO: setup up config file
# !!! SECRET KEY MUST BE UNIQUE IN PRODUCTION !!!
app.secret_key = b'_8H@jhAsDFh9kjd((!jf'
# app.config["APPLICATION_ROOT"] = "/api"
# app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=30) # 1 minute timeout for testing
# DEBUG
app.config['SESSION_COOKIE_SECURE'] = False # TODO: switch to True in production!!!
# app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(seconds=15) # 1 minute timeout for testing

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return get_user(id_str=user_id)

login_manager.init_app(app)

app.register_blueprint(userRoutes, url_prefix='/api')
app.register_blueprint(groupRoutes, url_prefix='/api/group')
app.register_blueprint(ledgerRoutes, url_prefix='/api/ledger')
