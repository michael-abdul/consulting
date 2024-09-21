import mongoose, { Schema } from "mongoose";
//Schmema first & Code first
const memberSchema = new Schema(
  {

    memberNick: {
      type: String,
    },

    memberPassword: {
      type: String,
      select: false,
      required: true,
    },
    memberImage: {
      type: String,
    },
    membercounts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // updatedAt, createdAt
);

export default mongoose.model<any>("Member", memberSchema);
