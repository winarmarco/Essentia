import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./Authentication";
import User, { UserRole } from "../../model/User";
import { ServerError } from "../Errors/ServerError";
import { UnauthorizedError } from "../Errors/UnauthorizedError";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req as AuthenticatedRequest).token;
  
    const user = await User.findById(token);

    if (!user) throw new ServerError("User not found");

    if (user.role != UserRole.ADMIN.toString()) throw new UnauthorizedError("Unauthorized request");

    next();
  } catch (error) {
    next(error);
  }
}
