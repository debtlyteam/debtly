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
    ret_data = {}
    json = request.json
    if not json:
        return ret_data, HTTPStatus.BAD_REQUEST

    # TODO: nicer verification of a valid request
    if 'email' in json and 'password' in json:
        user = get_user(json['email'])
        if user:
            ret_data['isLoggedIn'] = verify_password(user.password, json['password'])

            return ret_data
        return ret_data, HTTPStatus.OK

    return ret_data, HTTPStatus.BAD_REQUEST


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
        if add_user(user):
            return ret_data, HTTPStatus.OK
        else:
            print('add_user failed!')

    return ret_data, HTTPStatus.BAD_REQUEST
