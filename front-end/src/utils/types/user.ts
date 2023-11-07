import { z } from "zod";

const UserSchema=  z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
 
})