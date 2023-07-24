import { ErrorMessage } from "../types/Error";

export const parseError = (error: any) => {
  const errMessage = error as ErrorMessage;
  let errStr;
  try {
   // If this succeeds, the error message was a JSON string
   errStr = JSON.parse((error as ErrorMessage).message);
  } catch {
    // If JSON.parse throws, the error message was a plain string
    errStr = { message: (error as ErrorMessage).message };
  }

  return errStr;
}
