import { City } from "../enums/message";
import { ObjectId } from "mongoose";

export interface MessageInput {
  fullName: string;
  phone: string;
  city: City;
}
export interface Messages {
  _id: ObjectId;
  fullName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
