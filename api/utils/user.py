from flask_login import UserMixin
# Interface class to represent a user.
# A User object must be initialized with an email

# email: the unique identifier (i.e. email) describing the User
# first_name: (optional) the User's first name
# last_name: (optional) the user's last name
# password: (optional) the encoded password used to authenticate the User
# id_num: (optional) the unique id number associated with this iser
class User(UserMixin):
    def __init__(self, email, first_name = None, last_name = None, password = None, id_num = None):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.id_num = id_num

    # override of get_id to return the id_num (as a string)
    def get_id(self):
        return str(self.id_num)

    # function that returns data for the site to read, ie general user info
    # obviously this should not return the password, in any form
    def site_data(self):
        site_data = {}
        site_data['name'] = self.first_name
        site_data['email'] = self.email
        return site_data
