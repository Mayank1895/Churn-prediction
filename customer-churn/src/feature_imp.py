import os
import joblib
import pandas as pd
from xgboost import XGBClassifier

def load_model_and_features():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    model_path = os.path.join(base_dir, 'model', 'best_xgboost.pkl')
    data_path = os.path.join(base_dir, 'processed', 'X_train.csv')

    model = joblib.load(model_path)
    X_train = pd.read_csv(data_path)

    return model, X_train.columns

def print_feature_importance(model, feature_names, top_n=15):
    importances = model.feature_importances_
    feature_importance_dict = dict(zip(feature_names, importances))

    # Sort and print top N
    sorted_features = sorted(feature_importance_dict.items(), key=lambda x: x[1], reverse=True)

    print("\n🔍 Top Feature Importances (XGBoost):")
    for i, (feature, importance) in enumerate(sorted_features[:top_n], start=1):
        print(f"{i:2d}. {feature:<25} → {importance:.4f}")

if __name__ == "__main__":
    print("📦 Loading model and features...")
    model, feature_names = load_model_and_features()

    print_feature_importance(model, feature_names)
    print("✅ Done.")
