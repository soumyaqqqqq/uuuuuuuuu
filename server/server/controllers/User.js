import User from "../models/User.js";

export const signup = async (req, res) => {
  const { name, email, state } = req.body;
  console.log("Received signup request:", { name, email, state });

  try {
    const user = new User({ name, email, state });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  console.log("Received login request for email:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};  