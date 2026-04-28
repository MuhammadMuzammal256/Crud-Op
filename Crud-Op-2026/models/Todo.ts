import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;