import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const chk = (req: Request, res: Response, nxt: NextFunction): void => {
  const h = req.headers.authorization;
  if (!h) {
    res.status(401).json({ ok: false });
    return;
  }
  const t = h.split(" ")[1];
  try {
    const d = jwt.verify(t, process.env.JWT_SECRET || "");
    (req as any).user = d;
    nxt();
  } catch {
    res.status(401).json({ ok: false });
  }
};
