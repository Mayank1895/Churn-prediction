import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, f1_score, classification_report
import joblib
import os


def load_data():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))  # Go one level up from src/
    processed_dir = os.path.join(base_dir, "processed")

    X_train = pd.read_csv(os.path.join(processed_dir, "X_train.csv"))
    X_test = pd.read_csv(os.path.join(processed_dir, "X_test.csv"))
    y_train = pd.read_csv(os.path.join(processed_dir, "y_train.csv"))
    y_test = pd.read_csv(os.path.join(processed_dir, "y_test.csv"))

    return X_train, X_test, y_train.squeeze(), y_test.squeeze()


def train_and_evaluate_models(X_train, X_test, y_train, y_test):
    models = {
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    }

    scores = {}

    for name, model in models.items():
        print(f"\n🔧 Training {name}...")
        model.fit(X_train, y_train)
        preds = model.predict(X_test)

        acc = accuracy_score(y_test, preds)
        f1 = f1_score(y_test, preds)

        print(f"✅ Accuracy: {acc:.4f}")
        print(f"🎯 F1 Score: {f1:.4f}")
        print("📊 Classification Report:")
        print(classification_report(y_test, preds))

        scores[name] = {"accuracy": acc, "f1": f1, "model": model}

    return scores

def save_best_model(scores):
    best_model_name, best_model_data = max(scores.items(), key=lambda x: x[1]['f1'])
    os.makedirs("model", exist_ok=True)
    joblib.dump(best_model_data["model"], "model/churn_model.pkl")
    print(f"\n💾 Saved best model: {best_model_name} (F1: {best_model_data['f1']:.4f})")

if __name__ == "__main__":
    print("📦 Loading processed data...")
    X_train, X_test, y_train, y_test = load_data()

    print("🚀 Training models...")
    scores = train_and_evaluate_models(X_train, X_test, y_train, y_test)

    print("💾 Saving the best model...")
    save_best_model(scores)

    print("✅ Done!")
