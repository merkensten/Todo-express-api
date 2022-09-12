import StatusCodes from '../../helpers/StatusCodes.js';
import {
  addUserToDB,
  getAllUsersFromDB,
  getUserFromDB,
  getUserByUsernameFromDB,
  updateUserInDB,
  removeUserFromDB,
  loginUserAndGenerateToken,
} from './User.services.js';

const createUser = async (req, res) => {
  try {
    const response = await addUserToDB(req.body.username, req.body.password);
    res.status(StatusCodes.CREATED).send(response);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
};

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

const getUserWithId = async (req, res) => {
  try {
    const response = await getUserFromDB(req.params.userId);
    res.status(StatusCodes.OK).send(response);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        'Error occured while trying to retrive user with id:' +
        req.params.userId,
      error: error.message,
    });
  }
};

const getUserWithUsernameQuery = async (req, res) => {
  try {
    const response = await getUserByUsernameFromDB(req.query.username);
    response.length > 0
      ? res.status(StatusCodes.OK).send(response)
      : res.status(StatusCodes.NOT_FOUND).send({
          message: 'Could not find a user with username: ' + req.query.username,
        });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        'Error occured while trying to retrive user with username:' +
        req.query.username,
      error: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: 'Content can not be empty!' });
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
        'Error occured while trying to update user with id:' +
        req.params.userId,
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await removeUserFromDB(req.params.userId);
    res.status(StatusCodes.OK).send({
      message: `User with username: ${response.username} deleted successfully!`,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message:
        'Error occured while trying to delete user with id:' +
        req.params.userId,
      error: err.message,
    });
  }
};

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
  getUserWithUsernameQuery,
  updateUser,
  deleteUser,
  loginUser,
};
