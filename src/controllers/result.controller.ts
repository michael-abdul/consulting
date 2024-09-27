


import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import ResultService, { Result } from "../models/Result.service";

const resultController: T = {};
const resultService =  new ResultService();


resultController.createResult = async (
    req: AdminRequest,
    res: Response
  ) => {
    try {
      if (!req.files?.length)
        throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
      const data: Result = req.body;
      data.resultImages = req.files?.map((ele) => {
        return ele.path.replace(/\\/g, "/");
      });
      await resultService.createResult(data);
  
      res.status(HttpCode.CREATED).json(data);

    } catch (err) {
      console.log("Error, createResult", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
    }

    resultController.getAllResult = async (req: Request, res: Response) => {
        try {
          console.log("getAllResult");
          const data = await resultService.getAllResults();

      
          res.status(HttpCode.OK).json(data);
        } catch (err) {
          console.log("Error, getAllResult", err);
          if (err instanceof Errors) res.status(err.code).json(err);
          else res.status(Errors.standard.code).json(Errors.standard);
        }
      };
      resultController.removeResult = async (req: AdminRequest, res: Response) => {
        try {
          console.log("removeResult");
          const id = req.params.id
          const result = await resultService.removeResult(id);
          res.status(HttpCode.OK).json(result);
        } catch (err) {
          console.log("Error, removeResult", err);
          if (err instanceof Errors) res.status(err.code).json(err);
          else res.status(Errors.standard.code).json(Errors.standard);
        }
      }
export default resultController;
  