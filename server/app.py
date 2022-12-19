from flask import Flask
from flask_cors import CORS
from getDataJson import GetPublicData

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False
app.config.from_pyfile('config.py')


@app.route('/')
def main():
    return 'Hello, World!'

@app.route('/safe', methods=['GET'])
def safe_zone():
    data = GetPublicData.api_police_safe()
    return data

@app.route('/ims', methods=['GET'])
def accident():
    data = GetPublicData.api_police_ims()
    return data

if __name__ == '__main__':
    app.run(debug=True)