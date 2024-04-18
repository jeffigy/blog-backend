const Blog = require("../models/Blog");

const getAllBlogs = async (_req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

const newBlog = async (req, res) => {
  const blog = new Blog(req.body);

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
};

module.exports = { getAllBlogs, newBlog };
