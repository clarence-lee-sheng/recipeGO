import flask
from flask import request, jsonify
from vision import image_label

app = flask.Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


@app.route('/imglabel', methods=['GET'])
def getImageLabel():
    lables = image_label("../images/fridge3.jpg")
    return str(lables)


app.run()
