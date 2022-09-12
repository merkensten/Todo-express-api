import TodoModel from "./todo.model.js";

const getTodosFromDB = (userId) => {
  const todos = TodoModel.find({ user: userId });

  return todos;
};

const addTodoToDB = (user, text) => {
  const todomodel = new TodoModel({
    user,
    text,
  });

  return todomodel.save();
};

const updateTodoInDB = async (todoId, user, text, completed) => {
  const todo = await TodoModel.findById(todoId);

  if (!todo) {
    return "Todo not found";
  }

  if (todo.user.toString() !== user) {
    return { message: "You are not authorized to update this todo", todoUser };
  }

  const dbResponse = await TodoModel.findByIdAndUpdate(
    todoId,
    {
      user,
      text,
      completed,
    },
    { new: true }
  );

  return dbResponse;
};


const removeTodoFromDB = async (todoId, user) => {
  const todo = await TodoModel.findById(todoId);

  if (!todo) {
    return "Todo not found";
  }

  if (todo.user.toString() !== user) {
    return "You are not authorized to update this todo";
  }

  const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

  return `Todo with id: ${deletedTodo._id} was deleted`;
};

export { addTodoToDB, getTodosFromDB, updateTodoInDB, removeTodoFromDB };
