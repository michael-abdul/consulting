import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    video: {
      type: String,

    },
    description: {
      type: String,
    },
  },
  { timestamps: true, collection: "customers" } // updatedAt, createdAt
);

export default mongoose.model("CustomerSchema", CustomerSchema);
