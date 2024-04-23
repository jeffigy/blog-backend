const Blog = require("../models/Blog");
const User = require("../models/User");

const initialBlogs = [
  {
    title: "sample title",
    author: "John Doe",
    url: "http://localhost:690000",
    likes: 3,
    user: "66272b1449e8703ca96b56c5",
  },
  {
    title: "sample title",
    author: "John Doe",
    url: "http://localhost:690000",
    likes: 25,
    user: "66264e906142dfbbd33aeae0",
  },
  {
    title: "sample title",
    author: "John Doe",
    url: "http://localhost:690000",
    likes: 35,
    user: "66272b1449e8703ca96b56c5",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDB };
