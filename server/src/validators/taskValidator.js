import { z } from "zod";

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .default(""),
  status: z
    .enum(["Pending", "In Progress", "Completed"], {
      errorMap: () => ({ message: "Status must be Pending, In Progress, or Completed" }),
    })
    .optional()
    .default("Pending"),
  priority: z
    .enum(["Low", "Medium", "High"], {
      errorMap: () => ({ message: "Priority must be Low, Medium, or High" }),
    })
    .optional()
    .default("Medium"),
  dueDate: z
    .string()
    .datetime({ offset: true, message: "Invalid date format" })
    .nullable()
    .optional()
    .default(null),
});

// Schema for updating a task (all fields optional)
export const updateTaskSchema = createTaskSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" }
);
