// backend/analysis/predict.js

import State from "../models/state.js";
import User from "../models/User.js";
import { alert } from "../utils/alert.js";

/**
 * Triggers alert emails for states where threshold frequency is breached.
 * Ensures users don't get duplicate emails on the same day.
 */
export async function runPrediction() {
  try {
    const states = await State.find({});
    console.log("📍 States fetched for prediction.");

    for (const state of states) {
      const randomChance = Math.random(); // 0–1
      const threshold = state.thresholdFrequency ?? 0.5; // fallback if undefined

      console.log(`🔍 State: ${state.state}, Threshold: ${threshold}, Random: ${randomChance}`);

      if (randomChance > threshold) {
        console.log(`🚨 Triggering alert for ${state.state}`);

        const users = await User.find({ state: state.state });

        if (!users.length) {
          console.log(`ℹ️ No users found in ${state.state}`);
          continue;
        }

        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hrs ago

        for (const user of users) {
          const lastSent = new Date(user.emailsent);

          // Skip if email sent within last 24 hours
          if (lastSent > oneDayAgo) {
            console.log(`⏩ Skipping ${user.email} (already emailed today)`);
            continue;
          }

          // Send alert
          await alert(user.email, state.state);
          user.emailsent = now;
          await user.save();

          console.log(`📧 Alert sent to ${user.email}`);
        }
      } else {
        console.log(`✅ ${state.state} did not exceed threshold. Skipping alert.`);
      }
    }

    console.log("✅ Prediction and alert check completed.");
  } catch (error) {
    console.error("❌ Error in prediction:", error);
  }
}

export const getPlaces = async (req, res) => {
  try {
    const states = await State.find({});
    // The `find` method returns an array of documents.
    // We should respond with the array itself or a mapped version.
    const stateNames = states.map(stateDoc => stateDoc.state);

    res.json(stateNames);
    console.log("📍 Places fetched successfully.", stateNames);
  } catch (error) {
    console.error("❌ Error fetching places:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};