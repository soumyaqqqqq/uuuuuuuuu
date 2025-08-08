import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const users = [
  {
    name: "Rakshith Ganjimut",
    email: "rakshithganjimut@gmail.com",
    state: "Karnataka"
  },
  {
    name: "Sanjana Chejeti",
    email: "sanjana.chejeti2024@vitstudent.ac.in",
    state: "Tamil Nadu"
  },
  {
    name: "Nirvik Goswami",
    email: "nirvik.goswami2024@vitstudent.ac.in",
    state: "Jharkhand"
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");

    await User.insertMany(users);
    console.log("✅ Users inserted");
  } catch (error) {
    console.error("❌ Error inserting users:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seedUsers();
