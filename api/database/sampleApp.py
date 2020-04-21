from flask import Flask, request, jsonify
from mongoengine import *
from pymongo.errors import DuplicateKeyError
from users import Users

app = Flask(__name__)

@app.route('/users', methods = ["GET"])
def get_users():
    name = request.args.get('Name')
    email = request.args.get('Email')
    password = request.args.get('Password')

    data = []
    for user in Users.objects:
        if name is not None:
            if user.name == name:
                data.append(user.to_json())
            else:
                pass
        elif email is not None:
            if user.email == email:
                data.append(user.to_json())
            else:
                pass
        else:
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
    except ValidationError as e:
        return {'Error': str(e)}, 400
    except DuplicateKeyError and NotUniqueError as e:
        return{'Error': str(e)}, 400

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
    connect('test') #, host='mongodb://localhost', port = 27017)
    app.run()

