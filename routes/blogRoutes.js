const blogRoute = require("express").Router();
const blogController = require("../controllers/blogController.js");

blogRoute
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.newBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = blogRoute;
