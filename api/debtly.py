from flask import Flask
from routes.user import userRoutes
from flask_session import Session
import mongoengine

mongoengine.connect('debtly')
app = Flask(__name__)

# TODO: setup up config file
# !!! SECRET KEY MUST BE UNIQUE IN PRODUCTION !!!
app.secret_key = b'_8H@jhAsDFh9kjd((!jf'
app.config['SESSION_TYPE'] = 'mongodb'
app.config['SESSION_MONGODB_DB'] = 'debtly'

Session(app)

app.register_blueprint(userRoutes)
