import { Request, Response } from "express";
import Blog from "../models/Blog";

const getAllBlogs = (_req: Request, res: Response) => {
  Blog.find({}).then((blogs) => {
    if (!blogs.length) {
      res.status(400).send({ message: "no blogs found" });
    } else {
      res.json(blogs);
    }
  });
};

const newBlog = (req: Request, res: Response) => {
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
