# Interface class to represent a transaction in a ledger

# Required members
# ower: the user that purchased the item
# amount: the amount amount spent
# split: dict of users to their amount
#
# Optional members
# num: transaction number
# date: the date the transaction was added to the database
# desc: the description of the transaction purchase
class Transaction():
    def __init__(self, ower_id, amount, split, **kwargs):
        self.ower_id = ower_id
        self.amount = amount
        self.split = split # NOTE: should there be a split class?

        self.num = kwargs['num'] if 'num' in kwargs else None
        self.date = kwargs['date'] if 'date' in kwargs else None
        self.desc = kwargs['desc'] if 'desc' in kwargs else None

    def serialize(self):
        json = {}
        json['ower_id'] = self.ower_id
        json['amount'] = self.amount
        json['split'] = self.split
        json['num'] = self.num
        json['desc'] = self.desc
        json['date'] = self.date.strftime('%Y-%m-%d')
        return json

    # TODO: add verification method for transaction
    # i.e. ensure debts sum correctly
    # def verify():
