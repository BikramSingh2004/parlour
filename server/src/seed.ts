import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user";
import bcrypt from "bcryptjs";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
  const e = "admin@example.com";
  const x = await User.findOne({ email: e });
  if (x) return console.log("user exist");
  const p = await bcrypt.hash("12345", 10);
  await User.create({ name: "bikram", email: e, pass: p, role: "superadmin" });
  console.log("ok");
  process.exit(0);
};

run();
