import { Session } from "express-session";
import { ObjectId } from "mongoose";
import { Request } from "express";
export interface Member {
  _id: ObjectId;
  memberNick: string;
  memberPassword?: string;
  memberImage?: string;
  memberCounts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberNick: string;
  memberPassword: string;
  memberImage?: string;
}
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: ObjectId;
  memberNick?: string;
  memberPassword: string;
  memberImage?: string;
}

export interface ExtendedRequest extends Request {
  member: Member;
  file: Express.Multer.File;
  files: Express.Multer.File[];
}

export interface AdminRequest extends Request {
  send(arg0: string): unknown;
  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
