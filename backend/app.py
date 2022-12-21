from flask import Flask, jsonify
from flask_cors import CORS
from config.db import daejeon_accident

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)


@app.route('/', methods=['GET'])
def test():

    return "a"


@app.route("/accident")
def accident():
    data = daejeon_accident()
    return data


if __name__ == '__main__':
    app.run(debug=True)
