import express from "express";
const blogRoutes = express.Router();
import { getAllBlogs, newBlog } from "../controllers/blogController.js";

blogRoutes.route("/").get(getAllBlogs).post(newBlog);

export default blogRoutes;
