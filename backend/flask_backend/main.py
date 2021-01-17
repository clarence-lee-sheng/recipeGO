from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
import json

from PIL import Image, ImageDraw
from google.cloud import vision
import os

from PIL import Image
import base64
from io import BytesIO
import io

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./ServiceAccountToken.json'

@app.route("/")
def home():
    return "Hello, World!"

    
@app.route("/", methods=["POST"])
@cross_origin()
def lol():
    data = json.loads(request.data)['image']   
    client = vision.ImageAnnotatorClient()
    
    img_bytes = BytesIO(base64.b64decode(data))
    content = img_bytes.read()
    im = Image.open(img_bytes)
    image = vision.Image(content=content)

    objects = client.object_localization(image=image).localized_object_annotations

    draw = ImageDraw.Draw(im)

    idx = 0

    unique_ing = []
    for object_ in objects:
        idx = idx+1
        vertices = object_.bounding_poly.normalized_vertices
        objectBoundary = []
        for i in range(len(vertices)):
            objectBoundary.append(
                (vertices[i].x * im.size[0], vertices[i].y * im.size[1]))

        im1 = im.crop((objectBoundary[0][0], objectBoundary[0]
                       [1], objectBoundary[2][0], objectBoundary[2][1]))

        for i in range(len(objectBoundary) - 1):
            draw.line(((objectBoundary[i][0], objectBoundary[i][1]),
                       (objectBoundary[i+1][0], objectBoundary[i+1][1])), fill='red', width=4)
        draw.line(((objectBoundary[len(objectBoundary)-1][0], objectBoundary[len(objectBoundary)-1][1]),
                   (objectBoundary[0][0], objectBoundary[0][1])), fill='red', width=4)

        byteIO = io.BytesIO()
        im1.save(byteIO, format='PNG')
        byteArr = byteIO.getvalue()
        image = vision.Image(content=byteArr)

        def add_list(name, unique_ing): 
            not_food = ['Packaged goods', 'Tableware', 'Bottle','Home appliance']
            if name not in unique_ing and name not in not_food:
                unique_ing.append(name)

        add_list(object_.name, unique_ing)

        indiv_objects = client.object_localization(image=image).localized_object_annotations
        for indiv_object in indiv_objects:
            add_list(indiv_object.name, unique_ing)
    print(unique_ing)
    im.show()
    return {"info":json.dumps(unique_ing)}
    
if __name__ == "__main__":
    app.run(debug=True)



