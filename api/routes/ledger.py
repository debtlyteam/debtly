from flask import Blueprint, request
from http import HTTPStatus
from flask_login import login_required, current_user
from database.interface import get_user
from utils.group import Group
from utils.transaction import Transaction
from utils.user import User
# HACK: temporary data generation
from tests.data_generation import transactions, summary

# blueprint for all user routes
ledgerRoutes = Blueprint('ledger_routes', __name__)

# Route to get a list of the ledgers transactions
# usage (note that <root> is likely going to be <host>/api/ledger):
# <root>/<group_id>/ --> returns the latest 50 transactions for that group
# <root>/<group_id>/?offset=<offset> --> returns 50 transactions after the offset
# <root>/<group_id>/?total=<total> --> returns the latest <total> transactions after the offset
# note they can be combined like so:
# <root>/<group_id>/?total=<total>?offset=<offset>
@ledgerRoutes.route('/<int:group_id>', methods = ['GET'])
@login_required
def get_transactions(group_id):
    ret_data = {}
    offset = request.args.get('offset', default = 0, type = int)
    total = request.args.get('total', default = 50, type = int)
    # HACK: temporary generation of transactions
    ret_data['transactions'] = [t.serialize() for t in transactions[offset:offset+total]]
    return ret_data, HTTPStatus.OK

# Route to get the summary of a ledger
@ledgerRoutes.route('/<int:group_id>/summary', methods = ['GET'])
@login_required
def get_summary(group_id):
    ret_data = {}
    # HACK: temporary generation of transactions
    ret_data['summary'] = summary
    return ret_data, HTTPStatus.OK
