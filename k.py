import json
from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = (224,224)

datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

# Use same folder you trained with
generator = datagen.flow_from_directory(
    "d:/SIH/images",
    target_size=IMG_SIZE,
    batch_size=32,
    class_mode="categorical",
    subset="training"
)

# Save class indices
with open("class_indices.json", "w") as f:
    json.dump(generator.class_indices, f)

print("✅ Class indices saved as class_indices.json")
print(generator.class_indices)
