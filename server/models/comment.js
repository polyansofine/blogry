import mongoose from "mongoose";

const Schema = mongoose.Schema;
const commentSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  body: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});
export default mongoose.model("Comment", commentSchema);
