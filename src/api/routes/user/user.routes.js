import express from 'express';

// internal imports
import UserController from './User.controller.js';

// middlewares
import authenticateUser from '../../middlewares/auth.js';

const {
  getAllUsers,
  getUserWithId,
  updateUser,
  deleteUser,
  loginUser,
  createUser,
} = UserController;

const userRouter = express.Router();

// Routes

// {{URL}}/user
userRouter.route('/').get(authenticateUser, getAllUsers).post(createUser);

// {{URL}}/user/login
userRouter.route('/login').post(loginUser);

// {{URL}}/user/:userId
userRouter
  .route('/:userId')
  .get(authenticateUser, getUserWithId)
  .put(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

export { userRouter };
