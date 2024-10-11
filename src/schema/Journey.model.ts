import mongoose, { Schema } from "mongoose";
import { FaqStatus } from "../libs/enums/faq.enum";

const journeySchema = new Schema(
  {
    journeyStatus: {
      type: String,
      enum: FaqStatus,
      default: FaqStatus.ACTIVE,
    },

    journeyYear: {
      type: String,
      required: true,
    },

    journeyDesc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, }
);

export default mongoose.model("Journey", journeySchema);
