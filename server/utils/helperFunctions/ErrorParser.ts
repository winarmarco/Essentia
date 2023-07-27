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


// lastKeyPerField converts
// {user.firstName : 'errors'} to {firstName: 'errors'}
// this is useful when we need to render error of each input field in the UI
export const parseExpressValidatorError = (err: Result<ValidationError>, lastKeyPerField: boolean = false) => {
  const fieldVisited: string[] = [];

  const errorsObject = err.array().reduce<FormattedExpressValidationError[]>((result, currErr) => {
    if (currErr.type === "field") {
      const formattedPath = (!lastKeyPerField) ? currErr.path.split(".").pop() : currErr.path;

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
