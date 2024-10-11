import { ObjectId } from "mongoose";
import { FaqStatus } from "../enums/faq.enum";
export interface JourneyInput {
  journeyYear: string;
  journeyDesc: string;
}

export interface JourneyUpdate {
  _id: ObjectId;
  journeyStatus?: FaqStatus;
  journeyYear?: string;
  journeyDesc?: string;
}

export interface Journey {
  _id: ObjectId;
  journeyYear: string;
  journeyDesc: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface JourneyInquiry {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    direction?: string; 
  }
  