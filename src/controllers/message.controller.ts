import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import MessageService from "../models/Message.service";
import { MessageInput } from "../libs/types/message";
const messageController: T = {};
const messageService = new MessageService();

messageController.createMessage = async (req: Request, res: Response) => {
  try {
    console.log("createMessage");
    const data: MessageInput = req.body;

    const result = await messageService.createMessage(data);

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createMessage", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
messageController.getMessages = async (req: Request, res: Response) => {
  try {
    console.log("getMessages");
    const data = await messageService.getMessages();

    res.status(HttpCode.OK).json(data);
  } catch (err) {
    console.log("Error, getMessages", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
export default messageController;
