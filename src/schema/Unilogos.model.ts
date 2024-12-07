import mongoose, { Schema } from "mongoose";
const memberSchema = new Schema(
  {
    unilogosImages: {
      type: String,
    },
  },
  { timestamps: true } // updatedAt, createdAt
);

export default mongoose.model("Unilogos", memberSchema);
