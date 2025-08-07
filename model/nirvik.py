import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# -------- Part 1: Outbreak Prediction Model -------- #

# 1. Load data
df = pd.read_csv("india_cases.csv")

# 2. Clean data
df = df.drop(columns=["Sno", "Time", "ConfirmedIndianNational", "ConfirmedForeignNational"])
df["Date"] = pd.to_datetime(df["Date"], format="%d/%m/%y")

# 3. Simulate 'Vaccinated' data (random 0-1 values)
np.random.seed(42)
df["Vaccinated"] = np.random.randint(0, 2, size=len(df))  # 0 or 1

# 4. Define 'Outbreak' → 1 if Confirmed cases > 50
df["Outbreak"] = df["Confirmed"].apply(lambda x: 1 if x > 50 else 0)

# 5. Features
features = ["Vaccinated", "Cured", "Deaths"]
X = df[features]
y = df["Outbreak"]

# 6. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 7. Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# 8. Predict
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

# 9. Evaluation
print("Classification Report:\n", classification_report(y_test, y_pred))

# 10. Results with probabilities
results = X_test.copy()
results["Outbreak_Actual"] = y_test.values
results["Outbreak_Predicted"] = y_pred
results["Outbreak_Probability"] = y_proba
print("\nSample predictions:\n", results.head())

# 11. Plot prediction probabilities
plt.figure()
plt.hist(y_proba, bins=10, edgecolor='k')
plt.title("Predicted Outbreak Probabilities")
plt.xlabel("Probability")
plt.ylabel("Number of Samples")
plt.tight_layout()
plt.show()

# 12. Map probabilities back to original DataFrame
test_indices = y_test.index
df_test = df.loc[test_indices].copy()
df_test["Outbreak_Probability"] = y_proba

# 13. Average outbreak probability by state
state_probabilities = df_test.groupby("State/UnionTerritory")["Outbreak_Probability"].mean()

print("\nAverage predicted outbreak probability per state:\n")
for state, prob in state_probabilities.items():
    print(f"{state}: {prob:.4f}")

# -------- Part 2: Confirmed Cases vs Vaccination Plot -------- #

# Step 1: Reload data for plot
cases_df = pd.read_csv("india_cases.csv")

# Step 2: Get latest confirmed cases per state
latest_cases = cases_df.groupby('State/UnionTerritory').tail(1)[['State/UnionTerritory', 'Confirmed']]

# Step 3: Simulated/Manually entered vaccination data
vaccination_data = {
    'State/UnionTerritory': [
        'Kerala', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka',
        'Andhra Pradesh', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'West Bengal'
    ],
    'total_doses_administered': [
        25000000, 32000000, 18000000, 22000000, 24000000,
        21000000, 35000000, 28000000, 26000000, 23000000
    ]
}
vacc_df = pd.DataFrame(vaccination_data)

# Step 4: Merge vaccination and case data
merged_df = pd.merge(latest_cases, vacc_df, on='State/UnionTerritory')

# Step 5: Plot cases vs vaccinated
plt.figure(figsize=(12, 6))
bar_width = 0.35
index = range(len(merged_df))

plt.bar(index, merged_df['Confirmed'], bar_width, label='Confirmed Cases')
plt.bar([i + bar_width for i in index], merged_df['total_doses_administered'], bar_width, label='Vaccinated')

plt.xlabel('State')
plt.ylabel('Count')
plt.title('Confirmed Cases vs Vaccinated Individuals (by State)')
plt.xticks([i + bar_width / 2 for i in index], merged_df['State/UnionTerritory'], rotation=45)
plt.legend()
plt.tight_layout()
plt.show()

# Step 6: Print probability estimate per state
print("\nProbability of getting COVID-19 per state (Confirmed / Vaccinated):\n")
for _, row in merged_df.iterrows():
    if row["total_doses_administered"] > 0:
        probability = row["Confirmed"] / row["total_doses_administered"]
        print(f"{row['State/UnionTerritory']}: {probability:.6f}")
    else:
        print(f"{row['State/UnionTerritory']}: Vaccination data not available")

# -------- End of Script -------- #