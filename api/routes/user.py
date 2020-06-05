from flask import Blueprint, request
from http import HTTPStatus
from flask_login import login_required, current_user, login_user, logout_user
from database.interface import add_user, get_user
from utils.user import User, register_requirements
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
            ret_data['user'] = user.serialize()
            return ret_data, HTTPStatus.OK
    return ret_data, HTTPStatus.UNAUTHORIZED


# Logout Route
@userRoutes.route('/logout', methods = ['GET'])
def logout():
    ret_data = {}
    logout_user()
    ret_data['isLoggedIn'] = current_user.is_authenticated
    return ret_data, HTTPStatus.OK


# Register Route
@userRoutes.route('/register', methods = ['POST'])
def register():
    ret_data = {}
    json = request.json
    if not json:
        return ret_data, HTTPStatus.BAD_REQUEST

    # ensures all required fields are in request's json
    if all(field in register_requirements for field in json):
        user = User(json['email'],
                    first_name = json['firstName'],
                    last_name = json['lastName'],
                    password = hash_password(json['password']))
        ret_data['isRegistered'] = add_user(user)
        print(ret_data)
        return ret_data, HTTPStatus.OK

    return ret_data, HTTPStatus.BAD_REQUEST


# Authentication Route
@userRoutes.route('/loadme', methods = ['GET'])
def authenticate():
    ret_data = {}
    ret_data['isLoggedIn'] = current_user.is_authenticated
    if current_user.is_authenticated:
        ret_data['user'] = current_user.serialize()
    return ret_data, HTTPStatus.OK
