import TeamModel from "../schema/Team.model";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";

import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import { TeamInput } from "../libs/types/team";
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

  }

export default TeamService;

