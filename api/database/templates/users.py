import mongoengine

class Users(mongoengine.Document):
    first_name = mongoengine.StringField(max_length = 50)
    last_name = mongoengine.StringField(max_length = 50)
    email = mongoengine.EmailField(required = True, unique = True)
    password = mongoengine.StringField(requred = True, min_length = 8)

