#from db import db
from mongoengine import *

class Users(Document):
    name = StringField(required = True, max_length = 50)
    email = EmailField(required = True, unique = True)
    password = StringField(requred = True, min_length = 8)

