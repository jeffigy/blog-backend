const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (_req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    id: 1,
  });

  res.json(users);
};

const newUser = async (req, res) => {
  const { username, name, password } = req.body;

  if (!name || !password || !username) {
    return res.status(400).json({ error: "all fields are required" });
  }

  if (password.length < 3 || username.length < 3) {
    return res
      .status(400)
      .json({ error: "password and username must be at least 3 characters" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    password: hashedPassword,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

module.exports = { getAllUsers, newUser };
