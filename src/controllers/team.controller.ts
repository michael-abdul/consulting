import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { TeamInput } from "../libs/types/team";
import TeamService from "../models/Team.service";

const teamController: T = {};
const teamService =  new TeamService();

teamController.createNewTeam = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewTeam");
    console.log( 'data',req.body)
    const data: TeamInput = req.body;
    if (req.file) data.image = req.file.path.replace(/\\/, "/");

    const result =  await teamService.createNewTeam(data);

    res.status(HttpCode.CREATED).json(result );
  } catch (err) {
    console.log("Error, createNewProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
export default teamController;
