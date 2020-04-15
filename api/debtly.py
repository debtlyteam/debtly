from flask import Flask
app = Flask(__name__)

@app.route('/')
def mainPage():
    return 'Debtly'

@app.route('/example')
def example():
    return { 'message' : 'Welcome to Debtly' }
