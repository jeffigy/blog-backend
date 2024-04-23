const loginRouter = require("express").Router();
const authController = require("../controllers/authController");

loginRouter.route("/").post(authController.login);

module.exports = loginRouter;
