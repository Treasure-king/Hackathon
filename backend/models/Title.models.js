import mongoose from "mongoose";

const TitleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  similarityScore: { type: Number, required: true },
});

const Title = mongoose.model("Title", TitleSchema);

export default Title;
