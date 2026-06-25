import prisma from "../config/db.js";

// CREATE TODO
export const createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Todo text is required",
      });
    }

    const todo = await prisma.todo.create({
      data: {
        text: text.trim(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL TODOS
export const getTodos = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TODO TEXT
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Updated todo text is required",
      });
    }

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        text: text.trim(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// TOGGLE TODO COMPLETE / INCOMPLETE
export const toggleTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        completed: !existingTodo.completed,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Todo status updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TODO
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingTodo = await prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
