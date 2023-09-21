import { NextFunction, Request, Response } from "express";
import mongoose, { Model } from "mongoose";
import { NotFoundError } from "../Errors/NotFoundError";
import { dotPropGet } from "../helperFunctions/DotProp";

interface ValidateIdOptions {
  path: string,
  model: Model<any>,
}

export interface AttachedRequest extends Request {
  document: any;
}

export const validateId = (options: ValidateIdOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { path, model } = options;
    const id = dotPropGet(req, path);

    try {
      if (!id) throw new NotFoundError("Invalid id");

      if (!mongoose.Types.ObjectId.isValid((id as string))) throw new NotFoundError(`Invalid ID '${id}'`);

      const document = await model.findById(id);

      if (!document) throw new NotFoundError(`ID '${id}' not found in database`);
      
      (req as AttachedRequest).document = document;
      next();
    } catch (error) {
      next(error);
    }
  }
} 