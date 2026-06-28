import Task from "../models/Task.js";

// @desc    Get all tasks (with search, filter, sort, pagination)
// @route   GET /api/tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const {
      search,
      status,
      priority,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 9,
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    if (priority && priority !== "All") {
      filter.priority = priority;
    }

    // Build sort object
    const sortOptions = {};
    const validSortFields = ["createdAt", "title", "priority", "dueDate"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

    // For priority sorting, use a custom approach
    if (sortField === "priority") {
      // We'll sort after fetching — see below
      sortOptions.createdAt = order === "asc" ? 1 : -1;
    } else {
      sortOptions[sortField] = order === "asc" ? 1 : -1;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    let tasks;
    const totalTasks = await Task.countDocuments(filter);

    if (sortField === "priority") {
      // Custom priority sorting using aggregation
      const priorityOrder = order === "asc"
        ? { High: 1, Medium: 2, Low: 3 }
        : { Low: 1, Medium: 2, High: 3 };

      tasks = await Task.aggregate([
        { $match: filter },
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "High"] }, then: priorityOrder.High },
                  { case: { $eq: ["$priority", "Medium"] }, then: priorityOrder.Medium },
                  { case: { $eq: ["$priority", "Low"] }, then: priorityOrder.Low },
                ],
                default: 4,
              },
            },
          },
        },
        { $sort: { priorityOrder: 1 } },
        { $skip: skip },
        { $limit: limitNum },
        { $project: { priorityOrder: 0 } },
      ]);
    } else {
      tasks = await Task.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum);
    }

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalTasks / limitNum),
        totalTasks,
        limit: limitNum,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.name === "CastError") {
      error.message = "Invalid task ID";
      error.statusCode = 400;
    }
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    if (error.name === "CastError") {
      error.message = "Invalid task ID";
      error.statusCode = 400;
    }
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    if (error.name === "CastError") {
      error.message = "Invalid task ID";
      error.statusCode = 400;
    }
    next(error);
  }
};
