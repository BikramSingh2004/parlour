import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, pass } = req.body;
  const u = await User.findOne({ email });
  if (!u || !u.pass) return res.status(401).json({ ok: false });
  const m = await bcrypt.compare(pass, u.pass);
  if (!m) return res.status(401).json({ ok: false });
  const t = jwt.sign(
    { id: u._id, role: u.role },
    process.env.JWT_SECRET || "",
    { expiresIn: "1d" }
  );
  res.json({ token: t });
};
