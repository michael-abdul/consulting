import mongoose, { Schema } from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
//Schmema first & Code first
const memberSchema = new Schema(
  {
    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },


    memberPassword: {
      type: String,
      select: false,
      required: true,
    },

    memberAddress: {
      type: String,
    },
    memberDesc: {
      type: String,
    },
    memberImage: {
      type: String,
    },
    univerImages: {
      type: [String],
    },
    memberPosts: {
      type: Number,
      default: 0,
    },
    memberTeams: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // updatedAt, createdAt
);

export default mongoose.model("Member", memberSchema);