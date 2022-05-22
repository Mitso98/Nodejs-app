const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

//@desc     Register new user
//@route    Post api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hasah password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Authenicate user
//@route    Post api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    res.status(200).json({
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      token: generateJWT(userExists.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc     get user
//@route    Get api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Genrate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
