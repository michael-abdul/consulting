import { ObjectId } from "mongoose";

export interface StatisticInput {
    experience:string;
    universities:string;
    customers:string;
    branches:string;
}
export interface StatisticUpdate{
    _id: ObjectId;
    experience?:string;
    universities?:string;
    customers?:string;
    branches?:string;
}

export interface Statistic {
    _id: ObjectId;
    experience:string;
    universities:string;
    customers:string;
    branches:string;
    createdAt: Date;
    updatedAt: Date;
}
export interface StatisticInquiry {
    page: number;
    limit: number;
    search?: string;
  }