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
print(get_user(user.email).email)

print("Deleting user")
print(delete_user(user.email))
