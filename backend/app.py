from flask import Flask, jsonify


app = Flask(__name__)

@app.route('/') # 접속하는 url
def index():
  return {"test":"500"}

if __name__=="__main__":
  app.run(debug=True, port="8000")
  # host 등을 직접 지정하고 싶다면
  # app.run(host="127.0.0.1", port="5000", debug=True)