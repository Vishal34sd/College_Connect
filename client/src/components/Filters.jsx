import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const Filters = ({
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
}) => {
  const statuses = ["All", "Pending", "In Progress", "Completed"];
  const priorities = ["All", "Low", "Medium", "High"];
  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "dueDate", label: "Due Date" },
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
  ];

  return (
    <div className="glass-card p-4 mb-6 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 pr-9"
            id="filter-search"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <HiXMark className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            id="filter-status"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>

        {/* Priority filter */}
        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="form-select"
            id="filter-priority"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All Priorities" : p}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            id="filter-sort"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Order */}
        <div>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="form-select"
            id="filter-order"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
