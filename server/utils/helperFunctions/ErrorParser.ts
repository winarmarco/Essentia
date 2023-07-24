import {Result, ValidationError} from "express-validator";
import {Error} from "mongoose";

export const parseMongooseValidationError = (err: Error.ValidationError) => {
  const errorsObject = Object.values(err.errors).map((el) => {
    return {field: el.path, message: el.message};
  });

  return JSON.stringify(errorsObject);
};

export interface FormattedExpressValidationError {
  field: string;
  message: string;
}

export const parseExpressValidatorError = (err: Result<ValidationError>) => {
  const fieldVisited: string[] = [];

  const errorsObject = err.array().reduce<FormattedExpressValidationError[]>((result, currErr) => {
    if (currErr.type === "field") {
      const formattedPath = currErr.path.split(".").pop();

      // if there are multiple error in the same path
      // take the first one
      if (formattedPath && (!Object.values(fieldVisited).includes(formattedPath))) {
        // mark formattedPath as visited
        fieldVisited.push(formattedPath);

        result.push({field: formattedPath, message: currErr.msg});
      }
    }

    return result;
  }, []);

  return JSON.stringify(errorsObject);
};
