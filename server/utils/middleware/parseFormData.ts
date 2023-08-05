import { NextFunction, Request, Response } from "express";

export const parseFormData = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Iterate through each key in req.body
    Object.keys(req.body).forEach(key => {
      // Parse the field if it's a string
      if (typeof req.body[key] === 'string') {
        req.body[key] = JSON.parse(req.body[key]);
      }
    });
  } catch (e) {
    // Send an error response if any of the parsing fails
    return res.status(400).send('Invalid JSON data');
  }
  
  next(); // Continue to the next middleware
};
