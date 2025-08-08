import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  state: { type: String, required: true },
  thresholdFrequency: { type: Number, required: true }
});

const State = mongoose.model("State", stateSchema);

export default State;
