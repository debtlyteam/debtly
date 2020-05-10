from utils.user import User

me = User("foo@bar.com", "Dead", "Beef", "hashedpw")

print(me.email)
print(me.lastName)
