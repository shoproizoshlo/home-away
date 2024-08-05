import { z } from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 charecters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 charecters" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 charecters" }),
});
