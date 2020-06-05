import random as r
from datetime import datetime
from bson import ObjectId
# very temp transaction and group data generation!!
from utils.group import Group
from utils.transaction import Transaction
from utils.user import User

# hey it's us
andrew = User('ajrae.nv@gmail.com', 'Andrew', 'Rae', None, ObjectId(b'some12charst'))
dennis = User('dennisvidovic@gmail.com', 'Dennis', 'Vidovic', None, ObjectId(b'sku10950a~02'))
yusef = User('yazia@uwaterloo.ca', 'Yusef', 'Zia', None, ObjectId(b')@idsaLh#@la'))
ethan = User('egoold@uwaterloo.ca', 'Ethan', 'Goold', None, ObjectId(b'kslk@)(ajkd@'))
tom = User('tjkidd@uwaterloo.ca', 'Tom', 'Kidd', None, ObjectId(b')(*&djak_872'))

# num transactions
num_transactions = 69

# group up
group = Group(
    'floor8',
    [andrew,
     dennis,
     yusef,
     ethan,
     tom],
    num_transactions=num_transactions,
    id_num=1)

# seed me papi
# def gen_transactions():
r.seed(420)

# transactions
num_users = len(group.users)
transactions = []
for i in range(num_transactions):
    ower = r.choice(group.users)
    amount = r.randint(10, 300)
    # divy it up
    num_involved = r.randint(2, num_users)
    # choose num involved out of users
    involved = r.sample(group.users, num_involved)
    div = float(amount) / float(num_involved)
    owed = amount
    if ower in involved:
        owed = div * (num_involved - 1)
    split = {}
    # dict by email for now,
    split[ower.email] = owed
    for user in involved:
        if user != ower:
            split[user.email] = -div

    transaction = Transaction(ower.email,
                              amount,
                              split,
                              desc = "This is test data",
                              num = i+1,
                              date = datetime.today())
    transactions.append(transaction)

transactions.reverse()
