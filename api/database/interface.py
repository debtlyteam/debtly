# Interface for common operations on the Mongo Database

from utils.user import User
from database.templates.users import Users as UserDoc
import mongoengine

# Adds a user to the database
#
# newUser: A User object containing the information of the user to add
#
# returns True iff the specified user was added to the database
def add_user(new_user):
    doc = UserDoc(
            first_name = new_user.first_name,
            last_name = new_user.last_name,
            email = new_user.email,
            password = new_user.password)
    
    try:
        doc.save(force_insert = True)
    except Exception as e:
        return False

    return True

# Retrieve a user from the data base using an email as the identifier
# Returns a user object the user exists and None otherwise
def get_user(email):
    # Gets a tuple of UserDocs that have the same email as the argument given.
    # UserDocs enforce a unique email, so a maximum of 1 user should be returned
    docs = UserDoc.objects(email = email)

    if len(docs) == 1:
        user = docs[0]

        return User(
                email = user.email,
                first_name = user.first_name,
                last_name = user.last_name,
                password = user.password)
    return None

# Remove a user from the database
# The user is referenced by email
# Returns True iff the user was successfully removed
def delete_user(email):
    docs = UserDoc.objects(email = email)

    if len(docs) == 1:
        user = docs[0]
        
        try:
            user.delete()
        except:
            return False

        return True
    
    return False
