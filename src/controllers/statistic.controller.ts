import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import StatisticService from "../models/Statistic.service";
import { StatisticInput, StatisticInquiry, StatisticUpdate } from "../libs/types/statistic";

const statisticController: T = {};
const statisticService = new StatisticService();

statisticController.createNewStatistic = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewStatistic");
    console.log("data", req.body);
    const data: StatisticInput = req.body;
    const result = await statisticService.createNewStatistic(data);
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createNewStatistic", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
statisticController.getStatistics = async (req: Request, res: Response) => {
  try {
    console.log("getStatistics");


    const result = await statisticService.getStatistics();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getStatistics", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
statisticController.getStatistic = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("getStatistic");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await statisticService.getStatistic(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getStatistic", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
statisticController.updateStatistic = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("updateStatistic");
    const id = req.params.id;
    const input: StatisticUpdate = req.body;
    const result = await statisticService.updateStatistic(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateStatistic", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

statisticController.removeStatistic = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("removeStatistic");
    const id = req.params.id;
    const result = await statisticService.removeStatistic(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeStatistic", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
export default statisticController;
