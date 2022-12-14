from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


@app.route('/')
def main():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)