import { useState, useEffect, useCallback } from "react";
import { fetchTasks, deleteTask as deleteTaskApi } from "../api/taskApi";
import toast from "react-hot-toast";

const useTasks = () => {
  // Task data
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    limit: 9,
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters, search, and sort
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  // Fetch tasks whenever filters/search/sort/page change
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 9,
        sortBy,
        order,
      };

      if (search.trim()) params.search = search.trim();
      if (statusFilter !== "All") params.status = statusFilter;
      if (priorityFilter !== "All") params.priority = priorityFilter;

      const { data: response } = await fetchTasks(params);

      setTasks(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch tasks";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy, order, page]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, priorityFilter, sortBy, order]);

  // Delete a task
  const removeTask = async (id) => {
    try {
      await deleteTaskApi(id);
      toast.success("Task deleted successfully");
      loadTasks(); // Refresh the list
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete task";
      toast.error(message);
    }
  };

  return {
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
    refreshTasks: loadTasks,
  };
};

export default useTasks;
