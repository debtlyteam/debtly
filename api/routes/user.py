from flask import Blueprint, request, session
from http import HTTPStatus
from flask_login import login_required, current_user, login_user
from database.interface import add_user, get_user
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
        user = get_user(email=json['email'])
        if user and verify_password(user.password, json['password']):
            login_user(user)
            ret_data['user'] = user.site_data()
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
        print(ret_data)
        return ret_data, HTTPStatus.OK

    return ret_data, HTTPStatus.BAD_REQUEST


# Authentication Route
@userRoutes.route('/authenticate', methods = ['GET'])
def authenticate():
    ret_data = {}
    ret_data['isLoggedIn'] = current_user.is_authenticated
    return ret_data, HTTPStatus.OK


# HACK: Protected Route
@userRoutes.route('/protected', methods = ['GET'])
@login_required
def protected():
    ret_data = {}
    ret_data['data'] = "we did it folks"
    return ret_data, HTTPStatus.OK
