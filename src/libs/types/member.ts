import { Session } from "express-session";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { ObjectId } from "mongoose";
import { Request } from "express";
export interface Member {
  _id: ObjectId;
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPosts: number;
  memberTeams: number;
  univerImages?:string[];


  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberNick: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  _id: ObjectId;
  memberNick?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  univerImages?:string[];
  memberPosts?: number;
  memberTeams?: number;

}

export interface ExtendedRequest extends Request {
  member: Member;
  file: Express.Multer.File;
  files?: {
    [fieldname: string]: Express.Multer.File[] ;
  };
}

export interface AdminRequest extends Request {
  send(arg0: string): unknown;
  member: Member;
  session: Session & { member: Member };
  file: Express.Multer.File;
  files: Express.Multer.File[];
}
