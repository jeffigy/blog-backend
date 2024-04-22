const usersRoute = require("express").Router();
const usersController = require("../controllers/usersController");

usersRoute
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.newUser);

module.exports = usersRoute;
