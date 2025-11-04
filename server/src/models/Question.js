import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  author: String,
  body: String
}, { timestamps: true });

const questionSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  author: String,
  body: String,
  answers: [answerSchema]
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
