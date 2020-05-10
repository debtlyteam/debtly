from flask import Flask
from routes/user import userRoutes

app = Flask(__name__)

app.register_blueprint(userRoutes)

