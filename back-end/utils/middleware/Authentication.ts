import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../Errors/UnauthorizedError";

export interface AuthenticatedRequest extends Request {
  token: string | JwtPayload;
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) throw new UnauthorizedError("No authorization token provided.");

    const decoded = jwt.verify(token, process.env.SECRET_KEY || "SECRET_KEY") as { _id?: string };

    if (!decoded || !decoded._id) throw new UnauthorizedError("Invalid token structure.");

    (req as AuthenticatedRequest).token = decoded._id;

    next();
  } catch (error) {
    next(error);
  }
}
