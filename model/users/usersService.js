const User = require("./Users");
const _ = require("lodash");
const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = (id, option) => {
  return User.find(id, option);
};

const getuserById = (id, options) => {
  return User.findById(id, options);
};

const updateUser = async (id, userToUpdat) => {
  return User.findByIdAndUpdate(id, userToUpdat, { new: true });
};

const DeleteUser = (id) => {
  return User.findByIdAndDelete(id);
};
/* 
const updateUser = (id, userToUpdate) => {
  return User.findByIdAndUpdate(id, userToUpdate); };*/

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getuserById,
  updateUser,
  DeleteUser,
  
};
