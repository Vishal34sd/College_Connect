import { Link } from "react-router-dom";
import { HiPencilSquare, HiTrash, HiCalendarDays } from "react-icons/hi2";
import Badge from "./Badge";

const TaskCard = ({ task, onDelete }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if task is overdue
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Completed";

  // Status icon dot color
  const statusDot = {
    Pending: "bg-amber-400",
    "In Progress": "bg-blue-400",
    Completed: "bg-emerald-400",
  };

  return (
    <div className="glass-card p-5 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-dark-950/50 hover:-translate-y-0.5 transition-all duration-300 animate-slide-up group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-2 h-2 rounded-full ${statusDot[task.status]} flex-shrink-0`} />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {task.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
          <Link
            to={`/edit/${task._id}`}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-500 hover:text-primary-500 transition-colors"
            aria-label="Edit task"
            id={`edit-task-${task._id}`}
          >
            <HiPencilSquare className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Delete task"
            id={`delete-task-${task._id}`}
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant={task.status}>{task.status}</Badge>
        <Badge variant={task.priority}>{task.priority}</Badge>
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div
          className={`flex items-center gap-1.5 text-xs ${
            isOverdue
              ? "text-red-500 dark:text-red-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <HiCalendarDays className="w-3.5 h-3.5" />
          <span>
            {isOverdue ? "Overdue: " : "Due: "}
            {formatDate(task.dueDate)}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
