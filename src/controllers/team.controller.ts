import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { TeamInput, TeamInquiry, TeamUpdateInput } from "../libs/types/team";
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
teamController.getTeams = async (req: Request, res: Response) => {
  try {
    console.log("getTeams");
    const {  page, limit,  search,  } = req.query;
    const inquiry: TeamInquiry = {
      page: Number(page),
      limit: Number(limit),
    };

    if (search) inquiry.search = String(search);

    const result = await teamService.getTeams(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getTeams", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
teamController.getTeam = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getTeam");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await teamService.getTeam(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getTeam", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
teamController.updateTeam = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateTeam");
    const id = req.params.id
    const input: TeamUpdateInput = req.body;
    if (req.file) input.image = req.file.path.replace(/\\/, "/");
    const result = await teamService.updateTeam(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateTeam", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

teamController.removeTeam = async (req: AdminRequest, res: Response) => {
  try {
    console.log("removeTeam");
    const id = req.params.id
    const result = await teamService.removeTeam(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeTeam", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}
export default teamController;
