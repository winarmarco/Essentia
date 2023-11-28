import {z} from "zod";

export const CardSchema = z.object({
  cardNumber: z
    .string()
    .min(1, {message: "Card Number is required"})
    .refine(
      (val) => {
        val = val.replace(/\s+/g, "");
        const CARD_NUMBER_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        return true;
      },
      {
        message: "Invalid card number",
      }
    ),
  CSC: z
    .string()
    .min(1, {message: "Card CSC is required"})
    .refine(
      (val) => {
        return val.match(/[1-9][0-9]{2}/);
      },
      {
        message: "Invalid CVC",
      }
    ),
  expiryDate: z
    .string()
    .min(1, {message: "Card Expiry date is required"})
    .refine(
      (val) => {
        const [monthStr, yearStr] = val.split("/");

        if (!monthStr.match(/[0-9]{2}/) || !yearStr.match(/[0-9]{2}/))
          return false;

        const month = Number(monthStr);
        const year = Number(yearStr);

        if (month < 0 || month > 12) return false;

        return true;
      },
      {
        message: "Invalid card expiry date",
      }
    ).refine(
      (val) => {
        const [monthStr, yearStr] = val.split("/");

        if (!monthStr.match(/[0-9]{2}/) || !yearStr.match(/[0-9]{2}/))
          return false;

        const month = Number(monthStr);
        const year = Number(yearStr);

        const adjMonth = month + 1;
        const adjYear = 2000 + year;

        const currDate = new Date();
        const expDate = new Date(adjYear, adjMonth);

        return currDate < expDate;
      },
      {
        message: "Card has expired"
      }
    ),
  holder: z.string().min(1, {message: "Card holder is required"}),
});

export type ICard = z.infer<typeof CardSchema>;
