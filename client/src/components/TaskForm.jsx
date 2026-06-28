import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import { validateTask } from "../validations/taskSchema";
import { createTask, updateTask } from "../api/taskApi";
import toast from "react-hot-toast";

const TaskForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "Pending",
        priority: initialData.priority || "Medium",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data
    const submitData = { ...formData };
    if (!submitData.dueDate) {
      submitData.dueDate = null;
    } else {
      try {
        submitData.dueDate = new Date(submitData.dueDate).toISOString();
      } catch (err) {
        submitData.dueDate = null;
      }
    }

    // Validate with Zod
    const { success, data, errors: validationErrors } = validateTask(submitData);
    
    if (!success) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEdit) {
        await updateTask(initialData._id, data);
        toast.success("Task updated successfully");
      } else {
        await createTask(data);
        toast.success("Task created successfully");
      }
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Tasks
        </button>
      </div>

      <div className="glass-card p-6 md:p-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {isEdit ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="form-label">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""}`}
              placeholder="e.g., Complete project presentation"
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`form-input resize-none ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : ""}`}
              placeholder="Add some details about this task..."
            />
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && <p className="form-error">{errors.status}</p>}
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && <p className="form-error">{errors.priority}</p>}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
            {errors.dueDate && <p className="form-error">{errors.dueDate}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-dark-700">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
