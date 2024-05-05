const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const getAllBlogs = async (_req, res) => {
  const blogs = await Blog.find({}).populate("user", {
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

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ message: "token invalid " });
  }

  const user = await User.findById(decodedToken.id);

  const entry = new Blog({
    author,
    title,
    url,
    likes: likes ? likes : 0,
    user,
  });

  const savedBlog = await entry.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
};

const updateBlog = async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) {
    return res.status(400).send("title and url are required");
  }

  const blog = await Blog.findById(req.params.id).exec();

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
  const id = req.params.id;

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
