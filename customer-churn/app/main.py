from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import load_model_and_features, predict_churn

app = Flask(__name__)
CORS(app)

# Load model and feature columns at startup
model, feature_columns = load_model_and_features()

@app.route('/')
def home():
    return "✅ Customer Churn Prediction API is live!"

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        prediction_result = predict_churn(model, input_data, feature_columns)
        return jsonify(prediction_result)
    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
