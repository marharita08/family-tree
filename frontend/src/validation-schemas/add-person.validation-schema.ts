import { z } from "zod";

const AddPersonSchema = z.object({
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
    .nullable(),

  parent1Id: z
    .union([z.string(), z.number()])
    .transform(val => (val === "" ? null : val))
    .refine(val => val === null || typeof val === "number", {
      message: "Parent ID must be a number"
    })
    .nullable(),

  parent2Id: z
    .union([z.string(), z.number()])
    .transform(val => (val === "" ? null : val))
    .refine(val => val === null || typeof val === "number", {
      message: "Parent ID must be a number"
    })
    .nullable()
});

export { AddPersonSchema };
