import mongoose, { Schema } from "mongoose";
const memberSchema = new Schema(
  {
    resultImages: {
      type: String,
    },
  },
  { timestamps: true } // updatedAt, createdAt
);

export default mongoose.model("Result", memberSchema);
