# Interface class to represent a user. 
# A User object must be initialized with an email

# email: the unique identifier (i.e. email) describing the User
# firstName: the User's first name
# lastName: (optional) the user's last name
# password: (optional) the encoded password used to authenticate the User
class User:
    def __init__(self, email, firstName = None, lastName = None, password = None):
        self.email = email
        self.firstName = firstName
        self.lastName = lastName
        self.password = password
