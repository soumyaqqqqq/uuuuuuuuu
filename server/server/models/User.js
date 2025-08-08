import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
    emailsent: { type: Date, default: () => new Date(Date.now() - 24 * 60 * 60 * 1000) },
    state: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
