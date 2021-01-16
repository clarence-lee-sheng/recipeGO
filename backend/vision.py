from google.cloud import vision
import io

client = vision.ImageAnnotatorClient()

# Loads the image into memory
with io.open("./imgs/test.jpg", 'rb') as image_file:
    content = image_file.read()

image = vision.Image(content=content)

# Performs label detection on the image file
response = client.label_detection(image=image)
print(type(response))
labels = response.label_annotations

print('Labels:')
for label in labels:
    print(label.description)
