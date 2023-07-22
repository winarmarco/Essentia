import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const SECRET_KEY = "ASDASDSADSADWQEWQTW";

export interface AuthenticatedRequest extends Request {
  token: string | JwtPayload;
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) throw new Error("Not Authenticated");

    console.log(token);

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);

    (req as AuthenticatedRequest).token = decoded;

    next();
  } catch (error) {
    next(error);
  }
}