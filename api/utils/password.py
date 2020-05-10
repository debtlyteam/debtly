from flask.ext.bcrypt import generate_password_hash, check_password_hash

def hash_password(password):
    return generate_password_hash(password)

def verify_password(hashed_password, unhashed_password):
    return check_password_hash(hashed_password, unhashed_password)
