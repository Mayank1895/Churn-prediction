import pandas as pd
import os
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc, RocCurveDisplay

# Label map for clarity
label_map = {0: "Stays", 1: "Leaves"}

def load_data_and_model():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    model_dir = os.path.join(base_dir, 'model')
    processed_dir = os.path.join(base_dir, 'processed')

    # Load best XGBoost model
    model = joblib.load(os.path.join(model_dir, "best_xgboost.pkl"))

    # Load test data
    X_test = pd.read_csv(os.path.join(processed_dir, "X_test.csv"))
    y_test = pd.read_csv(os.path.join(processed_dir, "y_test.csv")).squeeze()

    return model, X_test, y_test

def plot_confusion_matrix(y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=[label_map[0], label_map[1]],
                yticklabels=[label_map[0], label_map[1]])
    plt.title("Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.tight_layout()
    plt.show()

def plot_roc_curve(y_true, y_proba):
    fpr, tpr, thresholds = roc_curve(y_true, y_proba)
    roc_auc = auc(fpr, tpr)

    plt.figure(figsize=(6, 5))
    plt.plot(fpr, tpr, color='darkorange', lw=2, label=f"AUC = {roc_auc:.2f}")
    plt.plot([0, 1], [0, 1], color='gray', lw=1, linestyle='--')
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curve")
    plt.legend(loc="lower right")
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    print("📦 Loading model and test data...")
    model, X_test, y_test = load_data_and_model()

    print("🤖 Making predictions...")
    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]

    print("📊 Plotting Confusion Matrix...")
    plot_confusion_matrix(y_test, y_pred)

    print("📈 Plotting ROC Curve...")
    plot_roc_curve(y_test, y_proba)

    print("✅ Visualization Done.")
