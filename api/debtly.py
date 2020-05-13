from flask import Flask
from routes.user import userRoutes
import mongoengine

mongoengine.connect('debtly')
app = Flask(__name__)

app.register_blueprint(userRoutes)
