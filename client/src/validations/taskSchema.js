import { z } from "zod";

export const taskSchema = z.object({
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
      errorMap: () => ({ message: "Please select a valid status" }),
    })
    .default("Pending"),
  priority: z
    .enum(["Low", "Medium", "High"], {
      errorMap: () => ({ message: "Please select a valid priority" }),
    })
    .default("Medium"),
  dueDate: z
    .string()
    .nullable()
    .optional(),
});

// Helper to validate and return errors keyed by field name
export const validateTask = (data) => {
  const result = taskSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data, errors: null };
  }

  // Transform Zod errors into a { fieldName: "message" } object
  const errors = {};
  result.error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  });

  return { success: false, data: null, errors };
};
