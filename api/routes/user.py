from flask import Blueprint, request, session
from http import HTTPStatus
from database.interface import add_user, get_user, get_user_id
from utils.user import User
from utils.password import hash_password, verify_password

# blueprint for all user routes
userRoutes = Blueprint('user_routes', __name__)

# Login Route
@userRoutes.route('/login', methods = ['POST'])
def login():
    ret_data = {}
    json = request.json
    if not json:
        return ret_data, HTTPStatus.BAD_REQUEST

    # TODO: nicer verification of a valid request
    if 'email' in json and 'password' in json:
        user = get_user(json['email'])
        if user and verify_password(user.password, json['password']):
            session['user'] = str(get_user_id(json['email']))
            ret_data['token'] = session['user']
            return ret_data, HTTPStatus.OK
    return ret_data, HTTPStatus.UNAUTHORIZED


# Register Route
@userRoutes.route('/register', methods = ['POST'])
def register():
    ret_data = {}
    json = request.json
    if not json:
        return ret_data, HTTPStatus.BAD_REQUEST

    # TODO: nicer verification of a valid request
    if 'email' in json and 'password' in json and 'name' in json:
        user = User(
                json['email'],
                first_name = json['name'],
                password = hash_password(json['password']))
        ret_data['isRegistered'] = add_user(user)
        return ret_data, HTTPStatus.OK

    return ret_data, HTTPStatus.BAD_REQUEST


# Authentication Route
@userRoutes.route('/authenticate', methods = ['GET'])
def authenticate():
    ret_data = {}
    ret_data['sid'] = session.sid # TODO: remove this line once auth is fully working
    if 'user' in session:
        ret_data['token'] = session['user']
        return ret_data, HTTPStatus.OK
    else:
        return ret_data, HTTPStatus.UNAUTHORIZED
