import { ObjectId } from "mongoose";

export interface Result {
    resultImages: string;
    _id: ObjectId;
  }

  export interface ResultInput {
    resultImages:string
  }