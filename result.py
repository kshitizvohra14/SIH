import uvicorn
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from tensorflow.keras.models import load_model

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (for React frontend or other clients)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],   # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your trained model
model = load_model("my_image_model.h5")

# Class labels
class_indices = {
    0: "Gir_cow", 1: "Murrah_buffalo", 2: "Red_Sindhi_cow",
    3: "Sahiwal_cow", 4: "Tharparkar_cow", 5: "amritmahal_cow",
    6: "banni_buffalo", 7: "bhadwari_buffalo", 8: "dharwadi_buffalo",
    9: "jafarabadi_buffalo"
}

# Preprocess function
def preprocess_frame(frame, target_size=(224, 224)):
    img = cv2.resize(frame, target_size)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)
    return img

@app.get("/")
async def index():
    # Simple test HTML page
    html_content = """
    <html>
        <body>
            <h2>Upload Image for Prediction</h2>
            <form action="/predict" enctype="multipart/form-data" method="post">
                <input name="image" type="file">
                <input type="submit" value="Upload">
            </form>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    try:
        # Read uploaded file
        contents = await image.read()
        np_arr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if frame is None:
            return JSONResponse(content={"error": "Invalid image format"}, status_code=400)

        # Preprocess & predict
        processed = preprocess_frame(frame)
        preds = model.predict(processed)

        class_id = int(np.argmax(preds, axis=1))
        label = class_indices.get(class_id, str(class_id))
        confidence = float(np.max(preds))

        return {"label": label, "confidence": confidence}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    # Run with: uvicorn filename:app --reload
    uvicorn.run(app, host="0.0.0.0", port=8000)
