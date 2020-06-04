from flask import Blueprint, request, session
from http import HTTPStatus
from flask_login import login_required, current_user
from database.interface import get_user
from utils.group import Group
from utils.transaction import Transaction
from utils.user import User
# HACK: temporary data generation
from tests.data_generation import group

# blueprint for all user routes
groupRoutes = Blueprint('group_routes', __name__)

@groupRoutes.route('/<int:group_id>', methods = ['GET'])
@login_required
def get_group(group_id):
    ret_data = {}
    # HACK: temporary data generation
    ret_data['group'] = group.serialize()

    # TODO: get rid of these
    print("group ret_data:")
    print(ret_data)

    return ret_data, HTTPStatus.OK
