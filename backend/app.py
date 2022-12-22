# from getData import GetPublicData
from config.db import Database
from flask import Flask, jsonify
from flask_cors import CORS

# from config import db

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route('/', methods=['GET'])
def test():
    
    return "a"


@app.route('/safezone')
def safe_zone_db():
    data = Database.safezone_db()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)