import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import FaqService from "../models/Faq.service";
import { FaqInput, FaqInquiry, FaqUpdate } from "../libs/types/faq";


const faqController: T = {};
const faqService =  new FaqService();

faqController.createFaq = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createFaq");
    console.log( 'data',req.body)
    const data: FaqInput = req.body;

    const result =  await faqService.createFaq(data);

    res.status(HttpCode.CREATED).json(result );
  } catch (err) {
    console.log("Error, createFaq", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
faqController.getFaqs = async (req: Request, res: Response) => {
  try {
    console.log("getFaqs");
    // const {  page, limit,  search,  } = req.query;
    // const inquiry: FaqInquiry = {
    //   page: Number(page),
    //   limit: Number(limit),
    // };

    // if (search) inquiry.search = String(search);

    const result = await faqService.getFaqs();

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getFaqs", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
faqController.getFaq = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getFaq");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await faqService.getFaq(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getFaq", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
faqController.updateFaq = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateFaq");
    const id = req.params.id
    const input: FaqUpdate = req.body;
    const result = await faqService.updateFaq(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateFaq", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

faqController.removeFaq = async (req: AdminRequest, res: Response) => {
  try {
    console.log("removeFaq");
    const id = req.params.id
    const result = await faqService.removeFaq(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeFaq", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}
export default faqController;
