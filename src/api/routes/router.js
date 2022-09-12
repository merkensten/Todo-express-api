import express from "express";
import { userRouter } from "./user/user.routes.js";
import { todoRouter } from "./todo/todo.routes.js";

const router = express.Router();

// routes
router.get("/", (_, res) => {
  res.send("Hello World");
});

router.use("/user", userRouter);
router.use("/todo", todoRouter);

export { router };
