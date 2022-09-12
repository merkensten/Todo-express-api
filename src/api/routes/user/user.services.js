import UserModel from './user.model.js';
import { BadRequestError, UnAuthenticatedError } from '../../errors/index.js';

const addUserToDB = (username, password) => {
  const user = new UserModel({
    username,
    password,
  });

  return user.save();
};

const getAllUsersFromDB = () => {
  return UserModel.find();
};

const getUserFromDB = (userId) => {
  return UserModel.findById(userId);
};

const getUserByUsernameFromDB = (username) => {
  return UserModel.find({ username });
};

const updateUserInDB = (userId, username, password) => {
  const dbResponse = UserModel.findByIdAndUpdate(
    userId,
    {
      username,
      password,
    },
    { new: true }
  );

  return dbResponse;
};

const removeUserFromDB = (userId) => {
  return UserModel.findByIdAndDelete(userId);
};

const loginUserAndGenerateToken = async (username, password) => {
  if (!username || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await UserModel.findOne({ username }).select('+password');

  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  // simpel lösning för att dölja lösenordet i responsen
  user.password = undefined;

  return { user, token };
};

export {
  addUserToDB,
  getAllUsersFromDB,
  getUserFromDB,
  getUserByUsernameFromDB,
  updateUserInDB,
  removeUserFromDB,
  loginUserAndGenerateToken,
};
