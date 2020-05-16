from flask import Flask
from routes.user import userRoutes
from flask_session import Session
import mongoengine

from datetime import timedelta

mongoengine.connect('debtly')
app = Flask(__name__)

# TODO: setup up config file
# !!! SECRET KEY MUST BE UNIQUE IN PRODUCTION !!!
app.secret_key = b'_8H@jhAsDFh9kjd((!jf'
app.config['SESSION_TYPE'] = 'mongodb'
app.config['SESSION_MONGODB_DB'] = 'debtly'
# app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
# DEBUG
app.config['SESSION_COOKIE_SECURE'] = False # TODO: switch to True in production!!!
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=1) # 1 minute timeout for testing

Session(app)

app.register_blueprint(userRoutes)
