from config.db import Database
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app,resources={r'*':{'origins':'http://localhost:3000'}},supports_credentials=True)


@app.route('/cctv')
def cctv():
    data = Database.cctv()

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)