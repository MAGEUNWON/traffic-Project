from flask import Flask
# from API import DataRoute
from config.db import DataRoute


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/', methods=['GET'])
def home():
    return "home"


@app.route('/dajeun', methods=['GET'])
def dajuen_Api():
    data = DataRoute.dajuen_Api()
    return data


@app.route('/unexpected', methods=['GET'])
def Unexpected_Api():
    data = DataRoute.Unexpected_Api()
    return data


@app.route('/safe', methods=['GET'])
def SafeData_Api():
    data = DataRoute.SafeData_Api()
    return data


@app.route('/danger', methods=['GET'])
def danger_Api():
    data = DataRoute.danger_Api()
    return data

    
if __name__ == '__main__':
    app.run(debug=True)