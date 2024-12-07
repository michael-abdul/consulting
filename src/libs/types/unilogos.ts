import { ObjectId } from "mongoose";

export interface Unilogos {
    unilogosImages: string;
    _id: ObjectId;
  }

  export interface UnilogosInput {
    unilogosImages:string
  }