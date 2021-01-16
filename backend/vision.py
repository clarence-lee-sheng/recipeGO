from google.cloud import vision
from PIL import Image, ImageDraw , Image, ImageFont
import io, os
from io import BytesIO
import base64
from numpy import random
import pandas as pd


##################################################################################
############################# Utility Functions ##################################
##################################################################################

def draw_borders(pillow_image, bounding, color, image_size, caption='', confidence_score=0):
    width, height = image_size

    ##################################################################################
    ######################## code to draw bounding boxes #############################
    ##################################################################################

    # can comment this out if dont want the bounding boxes and labels 

    draw = ImageDraw.Draw(pillow_image)
    draw.polygon([
        bounding.normalized_vertices[0].x * width, bounding.normalized_vertices[0].y * height,
        bounding.normalized_vertices[1].x * width, bounding.normalized_vertices[1].y * height,
        bounding.normalized_vertices[2].x * width, bounding.normalized_vertices[2].y * height,
        bounding.normalized_vertices[3].x * width, bounding.normalized_vertices[3].y * height
    ], fill=None, outline=color)  

    draw.text((bounding.normalized_vertices[0].x*width,bounding.normalized_vertices[0].y * height), text=caption, fill=color)
    draw.text((bounding.normalized_vertices[0].x*width,bounding.normalized_vertices[0].y * height + 20), text=str(confidence_score), fill=color)

    ##################################################################################
    ##################### end of code to draw bounding boxes #########################
    ##################################################################################

    ##################################################################################
    ################################ code to crop ####################################
    ##################################################################################

    # pillow_image.crop((left_x_coord, bot_y_coord, right_x_coord, top_y_coord))

    cropped_image = pillow_image.crop((bounding.normalized_vertices[0].x * width,bounding.normalized_vertices[0].y * height, (bounding.normalized_vertices[2].x) * width ,(bounding.normalized_vertices[2].y) * height))

    ##################################################################################
    ############################ end of code to crop #################################
    ##################################################################################
    
    return cropped_image

# code to convert pillow image (or whatever you crop) to base64 to use with other apis

def convert_PIL_image_to_base64(image):   
    buffered = BytesIO()
    pillow_image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str


##################################################################################
######################### End of Utility Functions ###############################
##################################################################################

##################################################################################
###################### Google Vision API Implementation ##########################
##################################################################################

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'ServiceAccountToken.json'

client = vision.ImageAnnotatorClient()
image_path = "C:/Users/65945/Downloads/TFR-1288-bar-fridge-open-cream-webn.jpg"

# Loads the image into memory
with io.open(image_path, 'rb') as image_file:
    content = image_file.read()

image = vision.Image(content=content)
response = client.object_localization(image=image)
localized_object_annotations = response.localized_object_annotations

pillow_image = Image.open(image_path)
df = pd.DataFrame(columns=['name', 'score'])
for obj in localized_object_annotations:
    df = df.append(
        dict(
            name=obj.name,
            score=obj.score
        ),
        ignore_index=True)

    # randomize bounding box colors 
    r, g, b = random.randint(150, 255), random.randint(
        150, 255), random.randint(150, 255)

    cropped = draw_borders(pillow_image, obj.bounding_poly, (r, g, b),
                 pillow_image.size, obj.name, obj.score)
    cropped.show()

# print(df)
# pillow_image.show()

##################################################################################
##################### End of Google Vision API Implementation ####################
##################################################################################


