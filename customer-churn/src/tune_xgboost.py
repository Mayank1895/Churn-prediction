import pandas as pd
import os
from xgboost import XGBClassifier
from sklearn.model_selection import RandomizedSearchCV
from sklearn.metrics import classification_report, f1_score
import joblib

def load_data():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    processed_dir = os.path.join(base_dir, "processed")

    X_train = pd.read_csv(os.path.join(processed_dir, "X_train.csv"))
    X_test = pd.read_csv(os.path.join(processed_dir, "X_test.csv"))
    y_train = pd.read_csv(os.path.join(processed_dir, "y_train.csv")).squeeze()
    y_test = pd.read_csv(os.path.join(processed_dir, "y_test.csv")).squeeze()

    return X_train, X_test, y_train, y_test

def tune_xgboost(X_train, y_train):
    # Calculate class imbalance weight
    scale_pos_weight = (y_train == 0).sum() / (y_train == 1).sum()

    param_dist = {
        'n_estimators': [100, 200, 300],
        'max_depth': [3, 5, 7, 10],
        'learning_rate': [0.01, 0.05, 0.1],
        'subsample': [0.8, 1],
        'colsample_bytree': [0.8, 1],
        'gamma': [0, 1, 5],
        'scale_pos_weight': [scale_pos_weight]
    }

    xgb = XGBClassifier(eval_metric='logloss', use_label_encoder=False, random_state=42)

    rscv = RandomizedSearchCV(
        xgb,
        param_distributions=param_dist,
        n_iter=30,
        scoring='f1',
        cv=5,
        verbose=2,
        n_jobs=-1,
        random_state=42
    )

    rscv.fit(X_train, y_train)
    print("\n✅ Best Parameters Found:")
    print(rscv.best_params_)
    return rscv.best_estimator_

def evaluate_model(model, X_test, y_test):
    preds = model.predict(X_test)
    f1 = f1_score(y_test, preds)
    print(f"\n🎯 Final F1 Score on Test Set: {f1:.4f}")
    print("\n📊 Classification Report:")
    print(classification_report(y_test, preds))

    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    model_dir = os.path.join(base_dir, 'model')

    # Make sure the model directory exists
    os.makedirs(model_dir, exist_ok=True)

    # Save the model in the correct location
    joblib.dump(model, os.path.join(model_dir, "best_xgboost.pkl"))
    print("\n💾 Model saved to model/best_xgboost.pkl")

if __name__ == "__main__":
    print("📦 Loading data...")
    X_train, X_test, y_train, y_test = load_data()

    print("⚡ Tuning XGBoost (this may take a few minutes)...")
    best_xgb = tune_xgboost(X_train, y_train)

    print("📈 Evaluating best model on test set...")
    evaluate_model(best_xgb, X_test, y_test)

    print("✅ Done.")
