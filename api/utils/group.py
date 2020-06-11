# Interface class to represent a user group

# Required members
# name: the name of the group
# users: the list of users (represented with a User class) in the group
#
# Optional members
# id_num: unique id number of the group
# num_transactions: number of transactions
class Group():
    def __init__(self, name, users, **kwargs):
        self.name = name
        self.users = users

        self.num_transactions = kwargs['num_transactions'] if 'num_transactions' in kwargs else None
        self.id_num = kwargs['id_num'] if 'id_num' in kwargs else None

    def serialize(self):
        json = {}
        json['id_num'] = self.id_num # TODO: hash this?
        json['name'] = self.name
        json['num_transactions'] = self.num_transactions
        # fill all the users
        json['users'] = []
        for user in self.users:
            json['users'].append(user.serialize())
        return json
