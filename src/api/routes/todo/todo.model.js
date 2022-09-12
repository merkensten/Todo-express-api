import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);



const TodoModel = mongoose.model("Todo", TodoSchema);

export default TodoModel;