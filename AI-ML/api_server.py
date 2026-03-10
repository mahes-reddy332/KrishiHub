import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import pandas as pd
import difflib

app = Flask(__name__)
CORS(app)

# ── Load model once at startup ──
MODEL_PATH = os.path.join(os.path.dirname(__file__), "trained_model.keras")
FERTILIZER_PATH = os.path.join(os.path.dirname(__file__), "fertilizers.csv")

print("Loading TensorFlow model...")
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded successfully.")

try:
    fertilizer_df = pd.read_csv(FERTILIZER_PATH)
except FileNotFoundError:
    fertilizer_df = pd.DataFrame(columns=["Crop Disease", "Fertilizer", "Fungicide / Insecticide", "Estimated Cost -1", "Estimated Cost -2"])

CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
    'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy',
]

def find_best_match(disease_name, disease_list):
    matches = difflib.get_close_matches(disease_name, disease_list, n=1, cutoff=0.4)
    return matches[0] if matches else None


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"success": False, "error": "No image file provided"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"success": False, "error": "Empty filename"}), 400

    try:
        # Read and preprocess image
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((128, 128))
        img_array = np.array(img, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        prediction = model.predict(img_array)
        result_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction)) * 100

        detected_class = CLASS_NAMES[result_index]
        formatted_disease = detected_class.replace("_", " ")
        is_healthy = "healthy" in detected_class.lower()

        # Try to find treatment from fertilizer CSV
        treatment = None
        if not is_healthy:
            csv_diseases = fertilizer_df["Crop Disease"].tolist() if not fertilizer_df.empty else []
            best_match = find_best_match(formatted_disease, csv_diseases)
            if best_match:
                row = fertilizer_df[fertilizer_df["Crop Disease"] == best_match].iloc[0]
                treatment = {
                    "disease": best_match,
                    "fertilizer": row.get("Fertilizer", "N/A"),
                    "fungicide": row.get("Fungicide / Insecticide", "N/A"),
                    "cost1": str(row.get("Estimated Cost -1", "N/A")),
                    "cost2": str(row.get("Estimated Cost -2", "N/A")),
                }

        # Build health score
        health_score = 95 if is_healthy else max(10, 90 - confidence)

        result = {
            "success": True,
            "prediction": {
                "class": detected_class,
                "disease": None if is_healthy else formatted_disease,
                "formatted": formatted_disease,
                "confidence": round(confidence, 1),
                "isHealthy": is_healthy,
                "health": round(health_score, 1),
                "treatment": treatment,
                "recommendations": get_recommendations(detected_class, is_healthy),
            },
        }
        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def get_recommendations(detected_class, is_healthy):
    if is_healthy:
        return [
            "Your crop looks healthy! Continue regular maintenance.",
            "Ensure adequate irrigation schedule.",
            "Monitor periodically for early signs of disease.",
        ]

    recs = [
        "Remove and destroy affected plant parts to prevent spread.",
        "Ensure proper air circulation between plants.",
        "Avoid overhead watering — use drip irrigation.",
    ]

    lower = detected_class.lower()
    if "rust" in lower:
        recs.append("Apply fungicides like propiconazole or tebuconazole.")
    elif "blight" in lower:
        recs.append("Apply copper-based fungicides early in the season.")
    elif "mildew" in lower:
        recs.append("Apply sulfur-based fungicides to affected areas.")
    elif "spot" in lower:
        recs.append("Use neem oil or copper sprays as treatment.")
    elif "virus" in lower or "mosaic" in lower:
        recs.append("Remove infected plants immediately — viruses have no cure.")
    else:
        recs.append("Consult your local agricultural extension office for specific treatment.")

    return recs


@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "model_loaded": model is not None})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
