


import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import ResultService from "../models/Result.service";
import { ResultInput } from "../libs/types/result";

const resultController: T = {};
const resultService =  new ResultService();


resultController.createResult = async (
    req: AdminRequest,
    res: Response
  ) => {
    try {
      const data: ResultInput = req.body;
      console.log("data",data)
      data.resultImages = req.file.path.replace(/\\/, "/");
      await resultService.createResult(data);
  
      res.status(HttpCode.CREATED).json(data);

    } catch (err) {
      console.log("Error, createResult", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
    }

    resultController.getAllResults = async (req: Request, res: Response) => {
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
  