const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createJWTToken } = require("../utils/jwt");

const userSignIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      const userNotFoundError = new Error("User not found");
      userNotFoundError.statusCode = 404;
      throw userNotFoundError;
    }

    const result = await bcrypt.compare(password, foundUser.password);
    if (!result) {
      const invalidPasswordError = new Error("Invalid password");
      invalidPasswordError.statusCode = 404;
      throw invalidPasswordError;
    }

    const token = createJWTToken(username);
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const expiryDate = new Date(Date.now() + oneWeek);

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      res.cookie("token", token, {
        expires: expiryDate,
        httpOnly: true,
        signed: true,
      });
    } else {
      res.cookie("token", token, {
        expires: expiryDate,
        httpOnly: true,
        secure: true,
        signed: true,
      });
    }

    res.send("You are now logged in");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const userSignOut = async (req, res, next) => {
  try {
    res.clearCookie("token").send("You are now logged out");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { userSignIn, userSignOut, createUser };
