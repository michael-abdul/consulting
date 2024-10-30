import TeamModel from "../schema/Team.model";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";

import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import { Member } from "../libs/types/member";
import ResultModel from "../schema/Result.model";
import { Result } from "../libs/types/result";

class ResultService {
  private readonly resultModel;

  constructor() {
    this.resultModel = ResultModel;
  }
  public async createResult(input: any): Promise<Result> {
    try {
      return await this.resultModel.create(input);
    } catch (err) {
      console.error("Error, model: createResult:", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async getAllResults(): Promise<Result[]> {
    const result = await this.resultModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    //console.log("result", result);
    return result;
  }

  public async removeResult(id: string): Promise<Result> {
    const resultId = shapeIntoMongooseObjectId(id);
    const search: T = { _id: resultId };
    const result = await this.resultModel.findOneAndDelete(search).exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.REMOVE_FAILED);

    return result;
  }
}

export default ResultService;
