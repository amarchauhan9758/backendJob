import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utilis/generateToken.js";

// @POST
// @LOGIN USER
const authUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user, "line no 11");
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).send({ message: "Invalid email or password !!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;

    console.log(req.body, "line no 32");
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    console.log(usernameExists, "line no 36");
    if (emailExists) {
      res.status(500).send({ message: "Email Already in use !!!" });
    }

    console.log(usernameExists, "line no 39");
    if (usernameExists) {
      res.status(500).send({ message: "Username Already in Use !!!" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      //   first_name,
      //   last_name,
    });

    if (newUser) {
      res.status(200).send({ message: "User Added Successfully !!!" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export { authUser, registerUser };
