import Blog from "../models/Blog.js";

const getAllBlogs = (_req, res) => {
  Blog.find({}).then((blogs) => {
    if (!blogs.length) {
      res.status(400).send({ message: "no blogs found" });
    } else {
      res.json(blogs);
    }
  });
};

const newBlog = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { getAllBlogs, newBlog };
