import mongoose, { Schema } from "mongoose";
import { FaqStatus } from "../libs/enums/faq.enum";

const faqSchema = new Schema(
  {
    faqStatus: {
      type: String,
      enum: FaqStatus,
      default: FaqStatus.ACTIVE,
    },

    faqTitle: {
      type: String,
      required: true,
    },

    faqContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "faqs" }
);

export default mongoose.model("Faq", faqSchema);
