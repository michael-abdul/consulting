import TeamModel from "../schema/Team.model";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";

import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import { TeamInput, TeamInquiry } from "../libs/types/team";
import { Team } from "../libs/types/team";

class TeamService {
  private readonly teamModel;

  constructor() {
    this.teamModel = TeamModel;
  }
  public async createNewTeam(input: TeamInput): Promise<Team> {
    try {
      return await this.teamModel.create(input);
    } catch (err) {
      console.error("Error, model: createNewProduct:", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getTeams(inquiry: TeamInquiry): Promise<Team[]> {
    const match: T = {};

    if (inquiry.search) {
      match.name = { $regex: new RegExp(inquiry.search, "i") };
    }


    const result = await this.teamModel
      .aggregate([
        { $match: match },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  }

export default TeamService;

