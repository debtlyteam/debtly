# Interface class to represent a transaction in a ledger

# Required members
# ower: the user that purchased the item
# amount: the amount amount spent
# split: dict of how the money splits between users
#
# Optional members
# num: transaction number
# date: the date the transaction was added to the database
# desc: the description of the transaction purchase
class Transaction():
    def __init__(self, ower, amount, split, **kwargs):
        self.ower = ower
        self.amount = amount
        self.split = split

        self.num = kwargs['num'] if 'num' in kwargs else None
        self.date = kwargs['date'] if 'date' in kwargs else None
        self.desc = kwargs['desc'] if 'desc' in kwargs else None

    # TODO: add verification method for transaction
    # i.e. ensure debts sum correctly
    # def verify():
