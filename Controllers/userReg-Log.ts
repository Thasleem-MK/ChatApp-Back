import { Request, Response } from "express";

export const userRegister = (req: Request, res: Response):void => {
  const body = req.body;
  res.status(200).json({ message: "User registered successfully", body });
};
