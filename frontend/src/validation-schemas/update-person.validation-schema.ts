import { z } from "zod";

const UpdatePersonSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),

  age: z
    .union([z.string(), z.number()])
    .transform(val => (val === "" ? null : val))
    .refine(
      val =>
        val === null ||
        (typeof val === "number" && val > 0 && Number.isInteger(val)),
      {
        message: "Age must be a positive integer"
      }
    )
    .nullable()
});

export { UpdatePersonSchema };
