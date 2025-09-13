import os
import numpy as np
import json
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

# Load trained model
model = load_model("my_image_model.h5")

# Load class indices
with open("class_indices.json", "r") as f:
    class_indices = json.load(f)

# Reverse mapping (index -> class name)
class_names = {v: k for k, v in class_indices.items()}

# Path to test folder
test_folder = "d:/SIH/test"

for img_name in os.listdir(test_folder):
    img_path = os.path.join(test_folder, img_name)
    if img_path.lower().endswith(('.png', '.jpg', '.jpeg')):  # only images
        img = image.load_img(img_path, target_size=(224,224))
        img_array = image.img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        pred = model.predict(img_array, verbose=0)
        predicted_class = class_names[np.argmax(pred)]

        print(f"{img_name} → Predicted Class: {predicted_class}")
