import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Todo from "./models/Todo";

const app = express();
const port: number = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/todo");
app.get("/", async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.render("todo", { todos });
});
app.post("/add", async (req: Request, res: Response) => {
  await Todo.create({ title: req.body.title });
  res.redirect("/");
});
app.post("/update/:id", async (req: Request, res: Response) => {
  await Todo.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
  });

  res.redirect("/");
});
app.get("/show", async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.render("show", { todos });
});
app.post("/delete/:id", async (req: Request, res: Response) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
app.post("/delete-all", async (req: Request, res: Response) => {
  await Todo.deleteMany({});
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});