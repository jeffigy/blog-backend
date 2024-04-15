import express, { Request, Response } from "express";
import cors from "cors";
import BlogRoute from "./routes/blogRoutes";
import { MONGODB_URI } from "./utils/config";
import mongoose from "mongoose";
import morgan from "morgan";

morgan.token("req-body", (req: Request, _res: Response) => {
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

app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "hello hello" });
});

app.use("/api/blogs", BlogRoute);

export default app;
