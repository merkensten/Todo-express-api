import StatusCodes from "../../helpers/StatusCodes.js";

import {
  addTodoToDB,
  getTodosFromDB,
  updateTodoInDB,
  removeTodoFromDB,
} from "./todo.services.js";

// @desc    Create user
// @route   POST /api/user
// @access  Public
const createTodo = async (req, res) => {
  const { user, text } = req.body;
  try {
    const response = await addTodoToDB(user, text);
    res.status(StatusCodes.CREATED).send(response);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

// @desc    Get All todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    const response = await getTodosFromDB(req.query.userId);
    res.status(StatusCodes.OK).send(response);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

// @desc    Update todo
// @route   PUT /api/todo:id
// @access  Private
const updateTodo = (req, res) => {
  try {
    if (!req.body) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Content can not be empty!" });
    }

    const response = updateTodoInDB(
      req.params.todoId,
      req.body.user,
      req.body.text,
      req.body.completed
    );
    res.status(StatusCodes.OK).send(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to update todo with id:" +
        req.params.todoId,
      error: err.message,
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todo:id
// @access  Private
const deleteTodo =  (req, res) => {
  const user = req.query.userId;
  try {
    const response = removeTodoFromDB(req.params.todoId, user);
    res.status(StatusCodes.OK).send(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to delete todo with id:" +
        req.params.todoId,
      error: err.message,
    });
  }
};

export { getTodos, updateTodo, deleteTodo, createTodo };
