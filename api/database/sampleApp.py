from flask import Flask, request, jsonify
from templates.users import Users
import mongoengine

app = Flask(__name__)

@app.route('/users', methods = ["GET"])
def get_users():
    data = []

    for user in Users.objects:
        data.append(user.to_json())
    
    dataDict = {'users': data}
    
    return dataDict, 200

@app.route('/users', methods = ['POST'])
def create_users():
    name = request.args.get('Name')
    email = request.args.get('Email')
    password = request.args.get('Password')
    data = Users(name = name, email = email, password = password)

    try:
        data.save()
    except mongoengine.NotUniqueError as e:
        return {'Error': str(e)}, 400
    except mongoengine.ValidationError as e:
        return {'Error': str(e)}, 400

    return {'success':'success!!!'}, 200

@app.route('/users/name', methods = ['GET'])
def get_users_name():
    name = request.args.get('Name')

    data = Users.objects(name = name)

    dataDict = {'users': data.to_json()}
    return dataDict, 200

@app.route('/users', methods = ['DELETE'])
def delete_users():
    name = request.args.get('Name')
    Users.objects(name = name).delete()

    return {'Success': 'User has been deleted'}

if __name__ == '__main__':
    mongoengine.connect('test') #, host='mongodb://localhost', port = 27017)
    app.run()

