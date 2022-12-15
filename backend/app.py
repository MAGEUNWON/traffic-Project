from flask import Flask, jsonify, request
import requests
import xmltodict

app = Flask(__name__)

@app.route('/') # 접속하는 url
def index():
  return {"test":"500"}


@app.route('/test') # 접속하는 url
def test():
        test= 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do?ServiceKey=ZEZs4lBh8JvrR1NlN1TOVkuL/gfojiZfZDkToH3jm4tNCg7bYk57heMG8VIUdfzrcmqn3VRhSkI2yXbWF3VOcA==&pageNo=1&numOfRows=10'
        response = requests.get(test)
        xpars = xmltodict.parse(response.text)
        jsonDump = jsonify(xpars)
        print(jsonDump)
        return jsonDump


if __name__=="__main__":
  app.run(debug=True, port="8000")
  # host 등을 직접 지정하고 싶다면
  # app.run(host="127.0.0.1", port="5000", debug=True)