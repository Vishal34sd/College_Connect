import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

const TaskList = ({ tasks, loading, error, onDelete }) => {
  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="glass-card p-6 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10">
        <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
