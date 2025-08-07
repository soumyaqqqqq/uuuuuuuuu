import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# 1. Load data
df = pd.read_csv("india_cases.csv")

# 2. Clean data
df = df.drop(columns=["Sno", "Time", "ConfirmedIndianNational", "ConfirmedForeignNational"])
df["Date"] = pd.to_datetime(df["Date"], format="%d/%m/%y")

# 3. Simulate 'Vaccinated' data
np.random.seed(42)
df["Vaccinated"] = np.random.randint(100, 10000, size=len(df))  # Simulated doses

# 4. Define 'Outbreak'
df["Outbreak"] = df["Confirmed"].apply(lambda x: 1 if x > 50 else 0)

# 5. Feature selection
features = ["Vaccinated", "Cured", "Deaths"]
X = df[features]
y = df["Outbreak"]

# 6. Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 7. Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# 8. Predict
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

# 9. Evaluate
print("Classification Report:\n", classification_report(y_test, y_pred))

# 10. Show prediction distribution
plt.figure(figsize=(8, 5))
plt.hist(y_proba, bins=10, edgecolor='k')
plt.title("Predicted Outbreak Probabilities")
plt.xlabel("Probability")
plt.ylabel("Number of Samples")
plt.tight_layout()
plt.show()

# 11. Calculate actual state-wise probability
grouped = df.groupby("State/UnionTerritory").agg({
    "Confirmed": "sum",
    "Vaccinated": "sum"
}).reset_index()

grouped["Estimated_Probability"] = grouped["Confirmed"] / grouped["Vaccinated"]

# Print state:probability
print("\nEstimated Probability of Getting COVID-19 Per State:")
for _, row in grouped.iterrows():
    print(f"{row['State/UnionTerritory']}: {row['Estimated_Probability']:.4f}")

# 12. Plot bar chart for state-wise estimated probability
plt.figure(figsize=(12, 6))
plt.bar(grouped["State/UnionTerritory"], grouped["Estimated_Probability"])
plt.title("Estimated COVID-19 Probability per State")
plt.xlabel("State")
plt.ylabel("Estimated Probability")
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()
# 13. Plot Patients vs Vaccinated per State
# 13. Plot Patients vs Vaccinated per State
plt.figure(figsize=(12, 6))
states = grouped["State/UnionTerritory"]
confirmed = grouped["Confirmed"]
vaccinated = grouped["Vaccinated"]

x = np.arange(len(states))
width = 0.4

plt.bar(x - width/2, confirmed, width=width, label='Confirmed Cases')
plt.bar(x + width/2, vaccinated, width=width, label='Vaccinated')

plt.title("Confirmed Cases vs Vaccinated per State")
plt.xlabel("State")
plt.ylabel("Count")
plt.xticks(x, states, rotation=90)
plt.legend()
plt.tight_layout()
plt.show()