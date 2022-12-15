from flask import Flask, jsonify, request
from flask_cors import CORS
from daejeon import DataRoute

app = Flask(__name__)
app.config['JSON_AS_ASCII']=False
CORS(app,resources={r'*':{'origins':'http://localhost:3000'}},supports_credentials=True)

@app.route('/')
def hello_World():
  return "Hello, 근수"

@app.route('/daejeon')
def daejeon():
  data = DataRoute.daejeon()
  return jsonify(data)




