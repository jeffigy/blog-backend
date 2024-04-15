import express from "express";
const BlogRoute = express.Router();
import { getAllBlogs, newBlog } from "../controllers/blogController";

BlogRoute.route("/").get(getAllBlogs).post(newBlog);

export default BlogRoute;
