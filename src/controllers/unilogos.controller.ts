import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ResultInput } from "../libs/types/result";
import UnilogosService from "../models/Unilogos.service";
import { UnilogosInput } from "../libs/types/unilogos";

const unilogosController: T = {};
const unilogosService = new UnilogosService();

unilogosController.createResult = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    const data: UnilogosInput = req.body;
    console.log("data", data);
    data.unilogosImages = req.file.path.replace(/\\/, "/");
    await unilogosService.createResult(data);

    res.status(HttpCode.CREATED).json(data);
  } catch (err) {
    console.log("Error, createResult", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

unilogosController.getAllResults = async (req: Request, res: Response) => {
  try {
    console.log("getAllResult");
    const data = await unilogosService.getAllResults();

    res.status(HttpCode.OK).json(data);
  } catch (err) {
    console.log("Error, getAllResult", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

unilogosController.removeResult = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("removeResult");
    const id = req.params.id;
    const result = await unilogosService.removeResult(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeResult", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default unilogosController;
