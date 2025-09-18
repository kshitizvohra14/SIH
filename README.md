# 🐄 SIH: Image-based Breed Recognition for Cattle & Buffaloes  

![Next.js](https://img.shields.io/badge/Frontend-Next.js-000000?logo=next.js)  
![Python](https://img.shields.io/badge/Backend-Python-3776AB?logo=python)  
![TensorFlow](https://img.shields.io/badge/ML-TensorFlow-FF6F00?logo=tensorflow)  
![License](https://img.shields.io/badge/License-MIT-green)  

> 🚀 A smart web-based solution to **identify cattle & buffalo breeds of India** from images.  
> Built as part of the **Smart India Hackathon (SIH)**.  

---

## ✨ Features  

- 📷 **Breed Recognition** – Upload an image, get instant prediction.  
- 🎨 **Modern Web UI** – Clean, responsive interface using Next.js.  
- 🤖 **Deep Learning Model** – Trained with TensorFlow/Keras, supports fine-tuning.  
- 📊 **Class Mapping** – JSON-based mapping for easy updates.  
- 🗂 **Data Collection Scripts** – Collect, clean, and preprocess datasets.  

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js + React + TypeScript  
- **Backend / ML:** Python, TensorFlow/Keras  
- **Data:** JSON (class indices, mappings), `.h5` trained models  
- **Styling:**  Tailwind css

---

## 📂 Project Structure  

Frontend Setup
cd app
npm install   # or pnpm install
npm run dev
👉 Open http://localhost:3000 in your browser(as it is note deployed).
3️⃣ Backend / ML Setup
python -m venv venv
source venv/bin/activate   # on Linux/Mac
venv\Scripts\activate      # on Windows

pip install -r requirements.txt
▶️ Usage
Web App: Upload an image in the browser and get instant predictions.
NOTE- currently our prototype only predict about 10 breeds only.
Direct Inference (CLI):
python result.py --input path/to/image.jpg
🧠 Model Training
To retrain/fine-tune the model:
python train.py --data ./dataset --epochs 20 --output my_image_model.h5
Update class_indices.json & breed.json after retraining.
New model file (.h5) can replace the existing one.
📊 Data Collection
Use datacollection.py to gather and preprocess dataset.
Ensure data is structured by folders (/breed_name/images).
Keep mappings updated in JSON files.9
