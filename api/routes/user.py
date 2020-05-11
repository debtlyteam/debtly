from flask import Blueprint, request
from http import HTTPStatus
from database.interface import add_user, get_user
from utils.user import User
from utils.password import hash_password, verify_password

# blueprint for all user routes
userRoutes = Blueprint('user_routes', __name__)

# Login Route
@userRoutes.route('/login', methods = ['POST'])
def login():
    json = request.json()
    if json.has_key('email') and json.has_key('password'):
        user = get_user(json['email'])
        isLoggedIn = verify_password(user.password, json['password'])
        return { 'isLoggedIn': isLoggedIn }
    else:
        return HTTPStatus.OK


# Register Route
@userRoutes.route('/register', methods = ['POST'])
def register():
    json = request.json()
    user = User(
            json['email'],
            first_name = json['firstName'],
            last_name = json['lastName'],
            password = hash_password(json['password']))
    if add_user(user):
        return HTTPStatus.OK
    else:
        return HTTPStatus.BAD_REQUEST



