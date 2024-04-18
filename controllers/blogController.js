const Blog = require("../models/Blog");

const getAllBlogs = async (_req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

const newBlog = async (req, res) => {
  const { author, title, likes, url } = req.body;

  if (!url || !title) {
    return res.status(400).send("Something went wrong");
  }

  const entry = {
    author,
    title,
    url,
    likes: likes ? likes : 0,
  };

  const newBlog = new Blog(entry);
  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
};

module.exports = { getAllBlogs, newBlog };
