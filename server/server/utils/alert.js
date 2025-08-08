import { sendMail } from "./sendMail.js";

/**
 * Sends a vaccination alert email to a user.
 * @param {string} email - User's email address
 * @param {string} state - User's state for the alert message
 */
const alert = async (email, state) => {
  try {
    const summary = `
Hello,

⚠️ This is a public health service alert for ${state}.

Our system has detected that the vaccination threshold frequency in your area (${state}) has been exceeded or flagged.

Please stay informed and take necessary precautions.

Stay safe,
Community Health Alert System
    `;

    await sendMail(email, "Vaccination Alert", summary);
  } catch (err) {
    console.error(`❌ Failed to send alert to ${email}:`, err);
  }
};

export { alert };
