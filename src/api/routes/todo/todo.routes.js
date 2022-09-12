import express from "express";

// internal imports
import {
  getTodos,
  updateTodo,
  deleteTodo,
  createTodo,
} from "./todo.controller.js";

// middlewares
import authenticateUser from "../../middlewares/auth.js";

const todoRouter = express.Router();

// Routes

// {{URL}}/todo
todoRouter.route("/").get(authenticateUser, getTodos).post(createTodo);

// {{URL}}/todo/:todoId
todoRouter
  .route("/:todoId")
  .put(authenticateUser, updateTodo)
  .delete(authenticateUser, deleteTodo);

export { todoRouter };
