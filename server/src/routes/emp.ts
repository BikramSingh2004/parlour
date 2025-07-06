import { Router } from "express";
import { getAll, add, upd, del } from "../controllers/emp";
import { chk } from "../middleware/auth";
import EmpModel from "../models/emp"; // ✅ required for public route

const r: Router = Router();

r.get("/", chk, getAll);
r.post("/", chk, add);
r.put("/:id", chk, upd);
r.delete("/:id", chk, del);

// ✅ Public route to return basic emp info for attendance
r.get("/public", async (req, res) => {
  try {
    const list = await EmpModel.find({}, { _id: 1, name: 1, email: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ ok: false, msg: "Failed to fetch employees" });
  }
});

export default r;
