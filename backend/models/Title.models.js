import mongoose from "mongoose";

const titleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    similarityScore: {
      type: Number,
      default: 0, // Default similarity score
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // All new titles start as Pending
    },
  },
  { timestamps: true }
);

const Title = mongoose.model("Title", titleSchema);

export default Title;
