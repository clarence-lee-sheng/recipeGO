from PIL import Image, ImageDraw
from google.cloud import vision


def localize_objects(path):
    """Localize objects in the local image.

    Args:
    path: The path to the local file.
    """

    # get image boundary
    client = vision.ImageAnnotatorClient()

    with open(path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    objects = client.object_localization(
        image=image).localized_object_annotations

    # draw boundary
    print('Number of objects found: {}'.format(len(objects)))

    im = Image.open(path)
    draw = ImageDraw.Draw(im)

    idx = 0
    for object_ in objects:
        idx = idx+1
        print(idx)
        print('\n{} (confidence: {})'.format(object_.name, object_.score))

        vertices = object_.bounding_poly.normalized_vertices
        objectBoundary = []
        for i in range(len(vertices)):
            objectBoundary.append(
                (vertices[i].x * im.size[0], vertices[i].y * im.size[1]))

        for i in range(len(objectBoundary) - 1):
            draw.line(((objectBoundary[i][0], objectBoundary[i][1]),
                       (objectBoundary[i+1][0], objectBoundary[i+1][1])), fill='red', width=4)
        draw.line(((objectBoundary[len(objectBoundary)-1][0], objectBoundary[len(objectBoundary)-1][1]),
                   (objectBoundary[0][0], objectBoundary[0][1])), fill='red', width=4)

        im1 = im.crop((objectBoundary[0][0], objectBoundary[0]
                       [1], objectBoundary[2][0], objectBoundary[2][1]))

        im1.save("./imgs/object_%s.jpg" % str(idx))
        im1.close()
    im.show()
    im.save("./imgs/test_with_object_boundary.jpg")


if __name__ == "__main__":
    path = "./imgs/test.jpg"
    localize_objects(path)
