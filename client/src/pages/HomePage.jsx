import { useState } from "react";
import useTasks from "../hooks/useTasks";
import Filters from "../components/Filters";
import TaskList from "../components/TaskList";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";

const HomePage = () => {
  const {
    tasks,
    pagination,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,
    page,
    setPage,
    removeTask,
  } = useTasks();

  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await removeTask(taskToDelete._id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and track your tasks effectively.
        </p>
      </div>

      <Filters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onDelete={handleDeleteClick}
      />

      {!loading && !error && tasks.length > 0 && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}

      <DeleteModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
};

export default HomePage;
