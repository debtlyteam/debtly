# Interface for common operations on the Mongo Database

from utils.user import User
from database.templates import Users as UserDoc
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
        print(e)    # TODO: Properly log errors
        return False

    return True


#
# Retrieve a user from the database
# Set the email argument to get a user by email, or the id argument to get a user by id
#   e.g: get_user( email = "you@example.com")
#        get_user( id = 123456 )
# Returns a user object if the user exists and None otherwise
#
def get_user(**kwargs):
    docs = None

    if "email" in kwargs:
        docs = UserDoc.objects(email = kwargs["email"])
    elif "id" in kwargs:
        docs = UserDoc.objects(id = kwargs["id"])

    if docs and len(docs) == 1:
        user = docs[0]

        return User(
                email = user.email,
                first_name = user.first_name,
                last_name = user.last_name,
                password = user.password,
                id_num = user.id)
    return None


# Remove a user from the database
# The user may be referenced by email or id in the same way as get_user
# Returns True iff the user was successfully removed
def delete_user(**kwargs):
    docs = None

    if "email" in kwargs:
        docs = UserDoc.objects(email = kwargs["email"])
    elif "id" in kwargs:
        docs = UserDoc.objects(id = kwargs["id"])

    if docs and len(docs) == 1:
        user = docs[0]

        try:
            user.delete()
        except Exception as e:
            print(e)
            return False

        return True
    
    return False

