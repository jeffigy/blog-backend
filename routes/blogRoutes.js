const blogRoute = require("express").Router();
const blogController = require("../controllers/blogController.js");

blogRoute
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.newBlog);

blogRoute
  .route("/:id")
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = blogRoute;
