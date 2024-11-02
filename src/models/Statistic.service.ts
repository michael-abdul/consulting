import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import StatisticModel from "../schema/Statistic.model";
import { Statistic, StatisticInput, StatisticInquiry, StatisticUpdate } from "../libs/types/statistic";

class StatisticService {
  private readonly staticModel;

  constructor() {
    this.staticModel = StatisticModel;
  }
  public async createNewStatistic(input: StatisticInput): Promise<Statistic> {
    try {
      return await this.staticModel.create(input);
    } catch (err) {
      console.error("Error, model: createNewStatistic:", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getStatistics(): Promise<Statistic[]> {
    const result = await this.staticModel.find()
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  public async getStatistic(memberId: ObjectId | null, id: string): Promise<Statistic> {
    const statisticId = shapeIntoMongooseObjectId(id);
    let result = await this.staticModel.findOne({ _id: statisticId }).exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateStatistic(
    id:string,
    input: StatisticUpdate
  ): Promise<Statistic> {
    const statisticId = shapeIntoMongooseObjectId(id);
    const result = await this.staticModel
      .findOneAndUpdate(
        {
          _id: statisticId,
        },
        input,
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
  public async removeStatistic(id: string): Promise<Statistic> {
    const statisticId  = shapeIntoMongooseObjectId(id)
		const search: T = { _id: statisticId };
		const result = await this.staticModel.findOneAndDelete(search).exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.REMOVE_FAILED);

		return result;
	}

}

export default StatisticService;
