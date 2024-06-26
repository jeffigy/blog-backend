const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");
const config = require("./utils/config");
const usersRoute = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");

morgan.token("req-body", (req, _res) => {
  if (process.env.NODE_ENV !== "test" && req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log(`connected to db`);
    })
    .catch((error) => {
      console.error("error connecting to db", error.message);
    });
}

app.get("/", (_req, res) => {
  res.send({ message: "hello hello" });
});

app.use("/api/blogs", blogRoutes);
app.use("/api/users", usersRoute);
app.use("/api/login", authRouter);

module.exports = app;
