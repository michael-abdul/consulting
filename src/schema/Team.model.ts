import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,

    },
    description: {
      type: String,
    },
  },
  { timestamps: true, collection: "teamMembers" } // updatedAt, createdAt
);

export default mongoose.model("TeamMember", TeamSchema);
