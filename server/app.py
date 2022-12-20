from flask import Flask
from flask_cors import CORS
from db import all_accident, daejeon_accident
app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return 'Hello, World!'


@app.route('/allAccident')
def accident():
    data = all_accident()
    return data


@app.route('/accident')
def dj_accident():
    data = daejeon_accident()
    return data


if __name__ == '__main__':
    app.run(debug=True)
