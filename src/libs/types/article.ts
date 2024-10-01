import { ObjectId } from "mongoose";

export interface Article {
  _id: ObjectId;
  articleTitle: string;
  articleContent: string;
  articleImage: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleInput {
  articleTitle: string;
  articleContent: string;
  articleImage: string;
}

export interface ArticleUpdate {
  _id: ObjectId;
  articleTitle?: string;
  articleContent?: string;
  articleImage?: string;
}


export interface ArticleInquiry {
    page: number;
    limit: number;
    search?: string;
  }
