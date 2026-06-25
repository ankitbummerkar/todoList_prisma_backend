import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/toggle", toggleTodoStatus);
router.delete("/:id", deleteTodo);

export default router;
