import cv2
import numpy as np
from tensorflow.keras.models import load_model

# 🔹 Load trained model
model = load_model("my_image_model.h5")

# 🔹 Your class labels
class_indices = {"Gir_cow": 0, "Murrah_buffalo": 1, "Red_Sindhi_cow": 2, "Sahiwal_cow": 3, "Tharparkar_cow": 4, "amritmahal_cow": 5, "banni_buffalo": 6, "bhadwari_buffalo": 7, "dharwadi_buffalo": 8, "jafarabadi_buffalo": 9}# Update with your classes

# 🔹 Preprocessing function
def preprocess_frame(frame, target_size=(224, 224)):
    img = cv2.resize(frame, target_size)          # Resize
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)    # BGR -> RGB
    img = img.astype("float32") / 255.0           # Normalize
    img = np.expand_dims(img, axis=0)             # Add batch dimension
    return img

# 🔹 Start webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    h, w, _ = frame.shape

    # Define square region (centered)
    size = min(h, w) // 2
    x1 = w // 2 - size // 2
    y1 = h // 2 - size // 2
    x2 = w // 2 + size // 2
    y2 = h // 2 + size // 2

    # Draw square
    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    # Extract ROI inside square
    roi = frame[y1:y2, x1:x2]

    # Preprocess ROI
    processed = preprocess_frame(roi, target_size=(224, 224))

    # Predict
    preds = model.predict(processed)
    class_id = np.argmax(preds, axis=1)[0]
    confidence = np.max(preds)

    # Label
    label = class_indices.get(class_id, str(class_id))
    text = f"{label} ({confidence:.2f})"

    # Put label inside square (centered)
    text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
    text_x = x1 + (size - text_size[0]) // 2
    text_y = y1 + (size + text_size[1]) // 2

    cv2.putText(frame, text, (text_x, text_y),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2, cv2.LINE_AA)

    # Show frame
    cv2.imshow("Detection with Square ROI", frame)

    # Quit with 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
