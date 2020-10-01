# Database interface for groups
from database.interfaces.includes import *

# Adds a group to the database
#
# new_group: A Group object containing relevant information of the group to add
#
# Returns True iff the group was succesfully added
def add_group(new_group):
    user_list = []

    for member in new_group.users:
        # Query by id if possible
        doc = None
        if member.id_num:
            doc = UserDoc.objects(id = member.id_num).first()
        else:
            doc = UserDoc.objects(email = member.email).first()

        if doc == None:
            print("Unable to form group: invalid user")
            return False
        
        user_list.append(doc)

    # get the admin
    new_admin = None
    if new_group.admin.id_num:
        new_admin = UserDoc.objects(id = new_group.admin.id_num).first()
    else:
        new_admin = UserDoc.objects(email = new_group.admin.email).first()

    if new_admin = None:
        print("Unable to form group: invalid admin")
        return False

    group_doc = GroupDoc(
            name = new_group.name,
            users = user_list,
            admin = new_admin,
            ledger = [],
            payments = [])

    try:
        group_doc.save(force_insert = True)
    except Exception as e:
        print(e)
        return False

    return True

def userdocs_to_users(userdocs)
    users = []

    for doc in userdocs:
        user_struct = User(
                email = doc.email,
                first_name = doc.first_name,
                last_name = doc.last_name,
                id_num = doc.id)
        users.append(user_struct)

    return users

def groupdocs_to_groups(groupdocs)
    groups = []

    for doc in groupdocs:
        group_struct = Group(
                name = doc.name,
                users = userdocs_to_users(doc.users),
                admin = userdocs_to_users((doc.admin, ))
                id_num = doc.id) # TODO num_transactions
        groups.append(group_struct)

    return groups

# Get a list of groups that a given User belongs to
#
# kwargs: id, email or id_str to identify a user
#
# Returns a list of groups if the user exists and is in a group or None otherwise
# The ledger and paments of groups will not be filled
def get_groups(**kwargs):
    docs = None

    if "email" in kwargs:
        docs = UserDoc.objects(email = kwargs["email"])
    elif "id" in kwargs:
        docs = UserDoc.objects(id = kwargs["id"])
    elif "id_str" in kwargs:
        docs = UserDoc.objects(id = ObjectId(kwargs["id_str"]))

    if not docs or len(docs) != 1:
        return None

    userdoc = docs[0]
    groupdocs = GroupDoc.objects(users = userdoc)

    return groupdocs_to_groups(groupdocs)

#TODO getters and adders for Transactions and Repayments
