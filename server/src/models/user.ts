import mongoose from "mongoose";

const uSch = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  pass: String,
  role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
});

export default mongoose.model("User", uSch);
