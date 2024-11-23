import { z } from "zod";

const UpdatePersonSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  age: z
    .number()
    .int({ message: "Age must be an integer" })
    .positive({ message: "Age must be a positive number" })
    .nullable()
});

export { UpdatePersonSchema };
