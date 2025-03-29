import mongoose from "mongoose";

const TitleSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  status: { type: String, default: "Pending" }, // Approved, Rejected, Pending
  similarityScore: Number,
});

const Title = mongoose.model("Title", TitleSchema);

export default Title;
