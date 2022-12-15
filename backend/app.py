from flask import Flask
from dajeun import DataRoute

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return "home"


@app.route('/dajeun', methods=['GET'])
def dajuen_Api():
    data = DataRoute.dajuen_Api()
    return data


    
if __name__ == '__main__':
    app.run(debug=True)