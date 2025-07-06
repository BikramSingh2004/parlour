import mongoose from "mongoose";

const s = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});

export default mongoose.model("Emp", s);
