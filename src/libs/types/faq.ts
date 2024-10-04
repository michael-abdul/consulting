import { FaqStatus } from "../enums/faq.enum";
import { ObjectId } from "mongoose";

export interface Faq {
  _id: ObjectId;
  faqStatus: FaqStatus;
  faqTitle: string;
  faqContent: string;
  memberId?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface FaqInput {
  faqTitle: string;
  faqContent: string;

}

export interface FaqUpdate {
  _id: ObjectId;
  faqStatus: FaqStatus;
  faqTitle: string;
  faqContent: string;


}

export interface FaqInquiry {
    page:number;
    limit:number;
    search?:string;
}