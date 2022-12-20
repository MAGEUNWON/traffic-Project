from flask import Flask, jsonify
from flask_cors import CORS 
# from config import db


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

@app.route('/', methods=['GET'])
def test():
    
    return "a"


if __name__ == '__main__':
    app.run(debug=True)