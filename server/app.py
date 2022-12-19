from flask import Flask
from flask_cors import CORS
from db import accident, all_accident
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
def daejeon_accident():
    data = accident()
    return data


if __name__ == '__main__':
    app.run(debug=True)
