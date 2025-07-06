import Task from "../models/task";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const x = await Task.find().populate("empId");
  res.json(x);
};

export const add = async (req: Request, res: Response): Promise<void> => {
  const u = (req as any).user;
  if (u.role !== "superadmin") {
    res.status(403).json({ ok: false });
    return;
  }
  const x = await Task.create(req.body);
  res.json(x);
};

export const upd = async (req: Request, res: Response): Promise<void> => {
  const u = (req as any).user;
  if (u.role !== "superadmin") {
    res.status(403).json({ ok: false });
    return;
  }
  const x = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(x);
};

export const del = async (req: Request, res: Response): Promise<void> => {
  const u = (req as any).user;
  if (u.role !== "superadmin") {
    res.status(403).json({ ok: false });
    return;
  }
  await Task.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
