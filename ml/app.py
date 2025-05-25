from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import json
import os
import sys
from PIL import Image
from flask_cors import CORS

# Add the project root to the Python path when running directly
if __name__ == "__main__":
    sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ml.config import IMAGE_SIZE
# Import the same preprocessing function used during training
preprocess_input = tf.keras.applications.efficientnet_v2.preprocess_input

app = Flask(__name__)
CORS(app)

# Define model directory path
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "model")
os.makedirs(MODEL_DIR, exist_ok=True)

# Create placeholder model files if they don't exist
if not os.path.exists(os.path.join(MODEL_DIR, "best_model.h5")):
    print("Warning: Model file not found. Please train the model first.")
    # Create a simple placeholder model for development
    simple_model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(224, 224, 3)),
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dense(10, activation='softmax')
    ])
    simple_model.compile(optimizer='adam', loss='categorical_crossentropy')
    simple_model.save(os.path.join(MODEL_DIR, "food_model.h5"))

# Create placeholder label map if it doesn't exist
if not os.path.exists(os.path.join(MODEL_DIR, "label_map.json")):
    print("Warning: Label map not found. Creating placeholder.")
    with open(os.path.join(MODEL_DIR, "label_map.json"), "w") as f:
        json.dump({"0": "placeholder_food"}, f)

# Create placeholder nutrition DB if it doesn't exist
if not os.path.exists(os.path.join(MODEL_DIR, "nutrition_db.json")):
    print("Warning: Nutrition database not found. Creating placeholder.")
    with open(os.path.join(MODEL_DIR, "nutrition_db.json"), "w") as f:
        json.dump({"placeholder_food": {"calories": 100}}, f)

# Load label map first so it's available for model creation if needed
with open(os.path.join(MODEL_DIR, "label_map.json"), "r") as f:
    label_map = json.load(f)

# Create a new model with the same architecture as the original
print("Creating a new model with the same architecture as the original...")

# Create the base model - IMPORTANT: Set trainable to False to match training phase 1
base_model = tf.keras.applications.efficientnet_v2.EfficientNetV2B0(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3)
)
base_model.trainable = False  # This is critical to match the training setup

# Create the model architecture - exactly matching the training script
model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.Dense(512, activation='relu'),
    tf.keras.layers.Dropout(0.4),
    tf.keras.layers.Dense(256, activation='relu'),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(len(label_map), activation='softmax', dtype='float32')  # Match the dtype
])

# Compile the model with the exact same parameters as training
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Load the weights from the best_model.h5 file
try:
    print("Loading weights from best_model.h5...")
    model.load_weights(os.path.join(MODEL_DIR, "best_model.h5"))
    print("Successfully loaded weights from best_model.h5")
    
    # Now set up the model for fine-tuning phase (phase 2) - unfreeze some layers
    base_model.trainable = True
    # Freeze all layers except the last 10
    for layer in base_model.layers[:-10]:
        layer.trainable = False
    
    # Recompile with lower learning rate for fine-tuning
    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-5),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    print("Model prepared for inference")
    
except Exception as e:
    print(f"Failed to load weights: {e}")
    print("Using model with ImageNet weights only")

# Load nutrition DB
with open(os.path.join(MODEL_DIR, "nutrition_db.json"), "r") as f:
    nutrition_data = json.load(f)

# Feedback file
FEEDBACK_PATH = os.path.join(MODEL_DIR, "user_feedback.json")
# Create data directory for uploaded images
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(FEEDBACK_PATH):
    with open(FEEDBACK_PATH, "w") as f:
        json.dump([], f)

CONFIDENCE_THRESHOLD = 0.15  # Significantly lowered to improve user experience


def preprocess_image(image_path):
    """Load and preprocess image for prediction."""
    img = Image.open(image_path)
    
    # Convert palette or images with transparency to RGBA, then to RGB
    if img.mode in ("P", "LA") or (img.mode == "RGBA" and "transparency" in img.info):
        img = img.convert("RGBA").convert("RGB")
    else:
        img = img.convert("RGB")
    
    img = img.resize(IMAGE_SIZE)
    img_array = np.array(img)
    
    # Use the same preprocessing function as during training
    img_array = preprocess_input(img_array)
    return np.expand_dims(img_array, axis=0)



def log_user_feedback(image_name, correct_label, predicted_label, confidence):
    with open(FEEDBACK_PATH, "r") as f:
        feedback = json.load(f)
    feedback.append({
        "image_name": image_name,
        "correct_label": correct_label,
        "predicted_label": predicted_label,
        "confidence": confidence
    })
    with open(FEEDBACK_PATH, "w") as f:
        json.dump(feedback, f, indent=2)


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "BhojanBuddy API is running",
        "endpoints": {
            "/predict": "POST - Upload an image for food recognition",
            "/feedback": "POST - Submit feedback for predictions"
        }
    })


@app.route("/predict", methods=["POST", "GET"])
def predict():
    if request.method == "GET":
        return jsonify({
            "message": "This endpoint requires a POST request with an image file",
            "usage": {
                "method": "POST",
                "content-type": "multipart/form-data",
                "form-data": {
                    "image": "(file) - The food image to analyze"
                }
            }
        })
        
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files["image"]
    image_path = os.path.join(DATA_DIR, image_file.filename)
    image_file.save(image_path)

    # Process the image
    img_tensor = preprocess_image(image_path)
    
    # Get predictions
    preds = model.predict(img_tensor)[0]
    
    # Get top 10 predictions, but only consider indices that exist in our label map
    top_indices = preds.argsort()[-10:][::-1]  # Get top 10 to have more candidates
    
    # Filter to only include valid indices
    valid_predictions = []
    for i in top_indices:
        if str(i) in label_map:
            label = label_map[str(i)]
            confidence = float(preds[i])
            valid_predictions.append({"label": label, "confidence": confidence, "index": int(i)})
    
    # Sort by confidence
    valid_predictions.sort(key=lambda x: x["confidence"], reverse=True)
    
    # Take top 5 valid predictions
    top_predictions = valid_predictions[:5]
    
    # If we have no valid predictions, return uncertain
    if not top_predictions:
        return jsonify({
            "status": "uncertain",
            "options": [{"label": "unknown", "confidence": 0.0}]
        })

    # Check if confidence is high enough
    if top_predictions[0]["confidence"] < CONFIDENCE_THRESHOLD:
        # Return options without the confidence boost
        return jsonify({
            "status": "uncertain",
            "options": [{"label": p["label"], "confidence": p["confidence"]} for p in top_predictions]
        })

    # We have a confident prediction
    label = top_predictions[0]["label"]
    confidence = top_predictions[0]["confidence"]
    nutrition = nutrition_data.get(label, {})
    
    # Get alternatives (if any)
    alternatives = []
    if len(top_predictions) > 1:
        alternatives = [{"label": p["label"], "confidence": p["confidence"]} for p in top_predictions[1:3]]
    
    return jsonify({
        "status": "confident",
        "predicted_label": label,
        "confidence": confidence,
        "nutrition": nutrition,
        "alternatives": alternatives
    })


@app.route("/feedback", methods=["POST", "GET"])
def feedback():
    if request.method == "GET":
        return jsonify({
            "message": "This endpoint requires a POST request with JSON data",
            "usage": {
                "method": "POST",
                "content-type": "application/json",
                "json_body": {
                    "image_name": "Name of the image file",
                    "correct_label": "The correct food label",
                    "predicted_label": "The label predicted by the model",
                    "confidence": "The confidence score of the prediction"
                }
            }
        })
        
    data = request.get_json()
    required_fields = ["image_name", "correct_label", "predicted_label", "confidence"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields."}), 400

    log_user_feedback(
        image_name=data["image_name"],
        correct_label=data["correct_label"],
        predicted_label=data["predicted_label"],
        confidence=data["confidence"]
    )
    return jsonify({"message": "Feedback recorded."})


if __name__ == "__main__":
    app.run(debug=True)