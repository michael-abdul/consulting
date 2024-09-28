import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import CustomerService from "../models/Customer.service";
import { CustomerInput,CustomerInquiry,CustomerUpdateInput } from "../libs/types/customer";


const customerController: T = {};
const customerService =  new CustomerService();

customerController.createNewCustomer = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewCustomer");
    console.log( 'data',req.body)
    const data: CustomerInput = req.body;
    if (req.file) data.video = req.file.path.replace(/\\/, "/");

    const result =  await customerService.createNewCustomer(data);

    res.status(HttpCode.CREATED).json(result );
  } catch (err) {
    console.log("Error, createNewCustomer", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
customerController.getCustomers = async (req: Request, res: Response) => {
  try {
    console.log("getCustomers");
    const {  page, limit,  search,  } = req.query;
    const inquiry: CustomerInquiry = {
      page: Number(page),
      limit: Number(limit),
    };

    if (search) inquiry.search = String(search);

    const result = await customerService.getCustomers(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getCustomers", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
customerController.getCustomer = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getCustomer");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await customerService.getCustomer(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getCustomer", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
customerController.updateCustomer = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateCustomer");
    const id = req.params.id
    const input: CustomerUpdateInput = req.body;
    if (req.file) input.video = req.file.path.replace(/\\/, "/");
    const result = await customerService.updateCustomer(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateCustomer", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

customerController.removeCustomer = async (req: AdminRequest, res: Response) => {
  try {
    console.log("removeCustomer");
    const id = req.params.id
    const result = await customerService.removeCustomer(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeCustomer", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}
export default customerController;
