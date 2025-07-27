# Churn-prediction
End-to-end Customer Churn Prediction using XGBoost, Flask API, and a responsive V0-generated Next.js frontend. Real-time predictions with a calibrated model and full backend–frontend integration. Ideal for AI/ML deployment 
# 📉 Customer Churn Prediction

This is a machine learning web application that predicts whether a customer will stay or leave a telecom company based on their details. Built with a tuned XGBoost model and a modern React (Next.js ) frontend.

---

## 🚀 Project Overview

- 🧠 **Model**: XGBoost Classifier (hyperparameter tuned)
- 📊 **Use Case**: Predicting customer churn using demographics, service usage, and payment behavior
- 🔍 **Frontend**: Next.js (React)
- 🛠 **Backend**: Flask API for serving predictions

---

## 💡 Features

- Beautiful, responsive UI built with TailwindCSS
- Real-time customer churn predictions
- Probabilistic confidence score
- Frontend-backend integration
- Handles all feature preprocessing and one-hot encoding

---

## 🧠 Model & Dataset

- **Model**: XGBoost (calibrated/tuned)
- **Data**: Telecom customer churn dataset (preprocessed)
- **Features Used**:
  - Demographics: Gender, SeniorCitizen, etc.
  - Services: Internet, Phone, Streaming
  - Contract: Tenure, MonthlyCharges, PaymentMethod
  - One-hot encoded service categories

---

## 🧪 How to Run

### Backend (Flask API)
```bash
# Step into the backend directory
cd backend/app

# Activate virtual environment
source ../env1/Scripts/activate  # Windows (adjust path if needed)

# Install dependencies
pip install -r ../requirements.txt

# Start the server
python main.py

Frontend:

# Step into the frontend directory
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
