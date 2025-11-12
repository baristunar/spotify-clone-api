const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    const error = new Error("User already exists");
    error.status = StatusCodes.CONFLICT;
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
    });
  } else {
    const error = new Error("Failed to create user");
    error.status = StatusCodes.BAD_REQUEST;
    throw error;
  }
});

module.exports = {
  registerUser,
};
