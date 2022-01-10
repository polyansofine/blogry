import mongoose from "mongoose";

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
export default mongoose.model("Categories", categorySchema);
