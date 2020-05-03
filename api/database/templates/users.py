import mongoengine

class Users(mongoengine.Document):
    name = mongoengine.StringField(required = True, max_length = 50)
    email = mongoengine.EmailField(required = True, unique = True)
    password = mongoengine.StringField(requred = True, min_length = 8)

