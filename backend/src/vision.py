from google.cloud import vision
import io
import os

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'../ServiceAccountToken.json'


def image_label(filename):
    print("Processing image_label")

    client = vision.ImageAnnotatorClient()
    # Loads the image into memory
    with io.open(filename, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    # print(response)
    labels = response.label_annotations
    return str(labels)


if __name__ == "__main__":
    labels = image_label("../images/fridge3.jpg")
    print('Labels:')
    for label in labels:
        print(label.description)
