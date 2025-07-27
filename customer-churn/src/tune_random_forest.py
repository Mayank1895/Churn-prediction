import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
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

def tune_random_forest(X_train, y_train):
    param_dist = {
        'n_estimators': [100, 200, 300, 400],
        'max_depth': [None, 10, 20, 30, 40],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4],
        'max_features': ['sqrt', 'log2'],
        'class_weight': ['balanced']
    }

    rf = RandomForestClassifier(random_state=42)
    rscv = RandomizedSearchCV(
        rf,
        param_distributions=param_dist,
        n_iter=30,
        cv=5,
        scoring='f1',
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
    joblib.dump(model, os.path.join(model_dir, "best_randomforest.pkl"))
    print("\n💾 Model saved to model/best_randomforest.pkl")

if __name__ == "__main__":
    print("📦 Loading data...")
    X_train, X_test, y_train, y_test = load_data()

    print("🔍 Tuning Random Forest (this may take a few minutes)...")
    best_rf = tune_random_forest(X_train, y_train)

    print("📈 Evaluating best model on test set...")
    evaluate_model(best_rf, X_test, y_test)

    print("✅ Done.")
