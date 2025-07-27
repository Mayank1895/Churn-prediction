import os
import joblib
import pandas as pd

# Label mapping for clarity
label_map = {0: "Stays", 1: "Leaves"}

def load_model_and_features():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    model_path = os.path.join(base_dir, 'model', 'best_xgboost.pkl')
    data_path = os.path.join(base_dir, 'processed', 'X_train.csv')

    model = joblib.load(model_path)
    X_train = pd.read_csv(data_path)
    feature_columns = X_train.columns.tolist()

    print("✅ Model expects the following input features:")
    print(feature_columns)


    return model, feature_columns
    

def predict_churn(model, input_data, feature_columns):
    import numpy as np

    # ✅ Step 1: Check for missing fields
    missing_fields = [col for col in ['tenure', 'MonthlyCharges', 'TotalCharges'] if col not in input_data]
    if missing_fields:
        raise ValueError(f"Missing required numeric fields: {missing_fields}")

    # Convert to DataFrame
    input_df = pd.DataFrame([input_data])

    # Convert numerical fields
    input_df['tenure'] = pd.to_numeric(input_df['tenure'], errors='coerce')
    input_df['MonthlyCharges'] = pd.to_numeric(input_df['MonthlyCharges'], errors='coerce')
    input_df['TotalCharges'] = pd.to_numeric(input_df['TotalCharges'], errors='coerce')

    # ✅ Step 2: Handle NaNs from conversion
    if input_df[['tenure', 'MonthlyCharges', 'TotalCharges']].isnull().any().any():
        raise ValueError("One or more numeric fields couldn't be converted. Please check the input values.")

    # One-hot encode to match training format
    input_df = pd.get_dummies(input_df)

    # Align with training columns (add missing ones, fill with 0)
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    # Prediction
    pred = model.predict(input_df)[0]
    proba = model.predict_proba(input_df)[0][1]

    return {
        "prediction": "Stays" if pred == 0 else "Leaves",
        "probability": f"{proba:.2f}"
    }
