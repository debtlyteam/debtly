# Quick tests for using the mongo database

from utils.user import User
from database.interface import add_user, get_user, delete_user
import mongoengine

mongoengine.connect('test')

user = User("me@gmail.com", "Me", "You", "HashedPassword")

print(user)
print("Adding User...")
print(add_user(user))

print("Getting User email...")
print(get_user(email = user.email).email)

print("Getting User ID Number...")
id_num = get_user(email = user.email).id_num
print (id_num)

print("Getting User by ID...")
print(get_user(id = id_num).id_num)

print("Deleting user...")
print(delete_user(email = user.email))
