import { Schema } from "mongoose";
import { City } from "../libs/enums/message";
import mongoose from "mongoose";

const messageSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      enum: City,
      required: true,
    },
  },
  { timestamps: true, collection: "messages" }
);

export default mongoose.model("Message", messageSchema);
