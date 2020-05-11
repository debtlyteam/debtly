# Interface class to represent a user. 
# A User object must be initialized with an email

# email: the unique identifier (i.e. email) describing the User
# first_name: (optional) the User's first name
# last_name: (optional) the user's last name
# password: (optional) the encoded password used to authenticate the User
class User:
    def __init__(self, email, first_name = None, last_name = None, password = None):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
