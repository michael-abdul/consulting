import { ObjectId } from "mongoose";

export interface Team  {
    _id: ObjectId;
    name: string;
    role: string;
    image?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface TeamInput {
    name: string;
    role: string;
    image?: string;
    description?: string;
  }


  export interface TeamUpdateInput {
    _id: ObjectId;
    name?: string;
    role?: string;
    image?: string;
    description?: string;
  }