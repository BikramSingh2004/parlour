import { Router } from "express";
import { getAll, add, upd, del } from "../controllers/task";
import { chk } from "../middleware/auth";

const r: Router = Router();

r.get("/", chk, getAll);
r.post("/", chk, add);
r.put("/:id", chk, upd);
r.delete("/:id", chk, del);

export default r;
