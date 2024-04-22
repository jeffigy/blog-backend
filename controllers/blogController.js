const Blog = require("../models/Blog");

const getAllBlogs = async (_req, res) => {
  const blogs = await Blog.find({}).populate("users", {
    username: 1,
    id: 1,
    name: 1,
  });
  res.json(blogs);
};

const newBlog = async (req, res) => {
  const { author, title, likes, url } = req.body;

  if (!url || !title) {
    return res.status(400).send("url and title are required");
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

const updateBlog = async (req, res) => {
  const { title, author, url, likes, id } = req.body;

  if (!id || !title || !url) {
    return res.status(400).send("id, title and url are required");
  }

  const blog = await Blog.findById(id).exec();

  if (!blog) {
    return res.status(400).send("Blog not found");
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();

  if (!updatedBlog) {
    return res.status(400).send("received data is invalid");
  }
  return res.status(200).send(JSON.stringify(updatedBlog));
};

const deleteBlog = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send("id is required");
  }

  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    return res.status(400).send("Blog not found");
  }
  return res.status(200).send("Blog deleted");
};
module.exports = {
  getAllBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
};
