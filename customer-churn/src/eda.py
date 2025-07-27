import pandas as pd

# 1. Load the dataset from the file
def load_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 2. Print useful information about the dataset
def explore_data(df):
    print("\n--- Top 5 Rows ---")
    print(df.head())   # Shows the first 5 rows (preview)

    print("\n--- Data Info ---")
    print(df.info())   # Shows column names, types, nulls

    print("\n--- Null Values ---")
    print(df.isnull().sum())  # Shows how many missing values

    print("\n--- Churn Value Counts ---")
    print(df['Churn'].value_counts(normalize=True) * 100)  # Target column distribution

    print("\n--- Numerical Summary ---")
    print(df.describe())  # Stats for numeric columns

    print("\n--- Unique Categorical Values ---")
    print(df.select_dtypes(include='object').nunique())  # How many unique values per categorical column

# 3. When this script is run directly, load and explore
if __name__ == "__main__":
    data_path = "../data/WA_Fn-UseC_-Telco-Customer-Churn.csv"  # Adjusted path
    df = load_data(data_path)
    explore_data(df)
