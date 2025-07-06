import mongoose from "mongoose";

const s = new mongoose.Schema({
  title: String,
  desc: String,
  empId: { type: mongoose.Schema.Types.ObjectId, ref: "Emp" },
});

export default mongoose.model("Task", s);

