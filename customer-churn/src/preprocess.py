import pandas as pd
from sklearn.model_selection import train_test_split
import os

def load_data(filepath):
    return pd.read_csv(filepath)

def clean_data(df):
    df = df.drop('customerID', axis=1)
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df = df.dropna(subset=['TotalCharges'])
    df.reset_index(drop=True, inplace=True)
    return df

def encode_features(df):
    binary_cols = ['Partner', 'Dependents', 'PhoneService', 'PaperlessBilling', 'Churn']
    for col in binary_cols:
        df[col] = df[col].map({'Yes': 1, 'No': 0})
    df['gender'] = df['gender'].map({'Female': 0, 'Male': 1})
    multi_cols = ['MultipleLines', 'InternetService', 'OnlineSecurity',
                  'OnlineBackup', 'DeviceProtection', 'TechSupport',
                  'StreamingTV', 'StreamingMovies', 'Contract', 'PaymentMethod']
    df = pd.get_dummies(df, columns=multi_cols)
    return df

def split_data(df):
    X = df.drop('Churn', axis=1)
    y = df['Churn']
    return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

def save_processed_data(X_train, X_test, y_train, y_test):
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  # One level up from src/
    processed_dir = os.path.join(base_dir, "processed")
    os.makedirs(processed_dir, exist_ok=True)
    X_train.to_csv(os.path.join(processed_dir, "X_train.csv"), index=False)
    X_test.to_csv(os.path.join(processed_dir, "X_test.csv"), index=False)
    y_train.to_csv(os.path.join(processed_dir, "y_train.csv"), index=False)
    y_test.to_csv(os.path.join(processed_dir, "y_test.csv"), index=False)

if __name__ == "__main__":
    data_path = "../data/WA_Fn-UseC_-Telco-Customer-Churn.csv"
    df = load_data(data_path)

    print("🔧 Cleaning data...")
    df = clean_data(df)

    print("🔁 Encoding features...")
    df = encode_features(df)

    print("🔄 Splitting into train and test sets...")
    X_train, X_test, y_train, y_test = split_data(df)

    print("💾 Saving processed data to /processed")
    save_processed_data(X_train, X_test, y_train, y_test)

    print("✅ Shapes:")
    print(f"X_train: {X_train.shape}")
    print(f"X_test: {X_test.shape}")
    print(f"y_train: {y_train.shape}")
    print(f"y_test: {y_test.shape}")
