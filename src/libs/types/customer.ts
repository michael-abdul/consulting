import { ObjectId } from "mongoose";

export interface Customer  {
    _id: ObjectId;
    name: string;
    role: string;
    video?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CustomerInput {
    name: string;
    role: string;
    video?: string;
    description?: string;
  }

  export interface CustomerInquiry {
    page: number;
    limit: number;
    search?: string;
    name?:string;
  }
  
  export interface CustomerUpdateInput {
    _id: ObjectId;
    name?: string;
    role?: string;
    video?: string;
    description?: string;
  }