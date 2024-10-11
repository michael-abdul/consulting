import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import JourneyService from "../models/Journey.service";
import { JourneyInput, JourneyInquiry, JourneyUpdate } from "../libs/types/journey";


const journeyController: T = {};
const journeyService =  new JourneyService();

journeyController.createJourney = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createJourney");
    console.log( 'data',req.body)
    const data: JourneyInput = req.body;

    const result =  await journeyService.createJourney(data);

    res.status(HttpCode.CREATED).json(result );
  } catch (err) {
    console.log("Error, createJourney", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
journeyController.getJourneys = async (req: Request, res: Response) => {
    try {
      console.log("getJourneys");
      const { page, limit, search, sort, direction } = req.query;
  
      const inquiry: JourneyInquiry = {
        page: Number(page),
        limit: Number(limit),
        sort: sort ? String(sort) : undefined, 
        direction: direction ? String(direction) : undefined 
      };
  
      if (search) inquiry.search = String(search);
  
      const result = await journeyService.getJourneys(inquiry);
  
      res.status(HttpCode.OK).json(result);
    } catch (err) {
      console.log("Error, getJourneys", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  };
  
journeyController.getJourney = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getJourney");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await journeyService.getJourney(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getJourney", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
journeyController.updateJourney = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateJourney");
    const id = req.params.id
    const input: JourneyUpdate = req.body;
    const result = await journeyService.updateJourney(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateJourney", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

journeyController.removeJourney = async (req: AdminRequest, res: Response) => {
  try {
    console.log("removeJourney");
    const id = req.params.id
    const result = await journeyService.removeJourney(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeJourney", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}
export default journeyController;
