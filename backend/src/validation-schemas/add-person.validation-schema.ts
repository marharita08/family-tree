import { z } from "zod";

const AddPersonSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  age: z
    .number()
    .int({ message: "Age must be an integer" })
    .positive({ message: "Age must be a positive number" })
    .nullable(),
  parent1Id: z.number().nullable(),
  parent2Id: z.number().nullable()
});

export { AddPersonSchema };
