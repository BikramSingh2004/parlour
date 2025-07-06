import { Router, Request, Response } from "express";
import { login } from "../controllers/auth";
import { chk } from "../middleware/auth";
import User from "../models/user";


const r: Router = Router();

r.post("/login", (req: Request, res: Response) => {
  login(req, res);
});


r.get("/me", chk, async(req, res) => {
  const u = (req as any).user;
  const found = await User.findById(u.id);
  res.json(found);
});


export default r;
