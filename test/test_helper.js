const Blog = require("../models/Blog");
const User = require("../models/User");

const initialBlogs = [
  {
    title: "sample title",
    author: "John Doe",
    url: "http://localhost:690000",
    likes: 3,
  },
  {
    title: "sample title",
    author: "John Doe",
    url: "http://localhost:690000",
    likes: 25,
  },
  {
    title: "sample title",
    author: "John Doe",
    url: "http://localhost:690000",
    likes: 35,
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
