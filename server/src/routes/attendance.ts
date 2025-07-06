import { Router } from "express";
import { getIO } from "../sockets/ws";

const r: Router = Router();

const logs: any[] = [];

r.get("/logs", (req, res) => {
  res.json(logs);
});

r.post("/punch", (req, res) => {
  const x = req.body;
  x.time = new Date();
  logs.push(x);
  getIO().emit("punch-log", x);
  res.json({ ok: true });
});

export default r;
