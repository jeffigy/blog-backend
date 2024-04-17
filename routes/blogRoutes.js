const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController.js");

router.route("/").get(blogController.getAllBlogs).post(blogController.newBlog);

module.exports = router;
