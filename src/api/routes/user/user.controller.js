import StatusCodes from "../../helpers/StatusCodes.js";
import {
  addUserToDB,
  getAllUsersFromDB,
  getUserFromDB,
  updateUserInDB,
  removeUserFromDB,
  loginUserAndGenerateToken,
} from "./User.services.js";

// @desc    Create user
// @route   POST /api/user
// @access  Public
const createUser = async (req, res) => {
  const { username, password, userLevel } = req.body;
  try {
    const response = await addUserToDB(username, password, userLevel);
    res.status(StatusCodes.CREATED).send(response);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

// @desc    Get All users
// @route   GET /api/user
// @access  Private
const getAllUsers = async (_, res) => {
  try {
    const response = await getAllUsersFromDB();
    res.status(StatusCodes.OK).send(response);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

// @desc    Get user with id
// @route   GET /api/user:id
// @access  Private
const getUserWithId = async (req, res) => {
  try {
    const response = await getUserFromDB(req.params.userId);
    res.status(StatusCodes.OK).send(response);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to retrive user with id:" +
        req.params.userId,
      error: error.message,
    });
  }
};

// @desc    Update user
// @route   PUT /api/user:id
// @access  Private
const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Content can not be empty!" });
    }

    const response = await updateUserInDB(
      req.params.userId,
      req.body.username,
      req.body.password
    );
    res.status(StatusCodes.OK).send(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to update user with id:" +
        req.params.userId,
      error: err.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/user:id
// @access  Private
const deleteUser = async (req, res) => {
  try {
    const response = await removeUserFromDB(req.params.userId);
    res.status(StatusCodes.OK).send({
      message: `User with username: ${response.username} deleted successfully!`,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        "Error occured while trying to delete user with id:" +
        req.params.userId,
      error: err.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/user/login
// @access  Private
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user, token } = await loginUserAndGenerateToken(username, password);
    res.status(StatusCodes.OK).json({ user, token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: error.message,
    });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserWithId,
  updateUser,
  deleteUser,
  loginUser,
};
