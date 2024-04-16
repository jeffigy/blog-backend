import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import blogRoutes from "./routes/blogRoutes.js";
import { MONGODB_URI } from "./utils/config.js";

morgan.token("req-body", (req, _res) => {
  if (req.method === "POST") {
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

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
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

export default app;
