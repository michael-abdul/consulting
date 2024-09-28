
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import { Customer, CustomerInput, CustomerInquiry, CustomerUpdateInput } from "../libs/types/customer";
import CustomerModel from "../schema/Customer.model";

class CustomerService {
  private readonly customerModel;

  constructor() {
    this.customerModel = CustomerModel;
  }
  public async createNewCustomer(input: CustomerInput): Promise<Customer> {
    try {
      return await this.customerModel.create(input);
    } catch (err) {
      console.error("Error, model: createNewCustomer:", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getCustomers(inquiry: CustomerInquiry): Promise<Customer[]> {
    const match: T = {};

    if (inquiry.search) {
      match.name = { $regex: new RegExp(inquiry.search, "i") };
    }

    const result = await this.customerModel
      .aggregate([
        { $match: match },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  public async getCustomer(memberId: ObjectId | null, id: string): Promise<Customer> {
    const customerId = shapeIntoMongooseObjectId(id);
    let result = await this.customerModel.findOne({ _id: customerId }).exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateCustomer(
    id:string,
    input: CustomerUpdateInput
  ): Promise<Customer> {
    const customerId = shapeIntoMongooseObjectId(id);
    const result = await this.customerModel
      .findOneAndUpdate(
        {
          _id: customerId,
        },
        input,
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
  public async removeCustomer(id: string): Promise<Customer> {
    const customerId  = shapeIntoMongooseObjectId(id)
		const search: T = { _id: customerId };
		const result = await this.customerModel.findOneAndDelete(search).exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.REMOVE_FAILED);

		return result;
	}

}

export default CustomerService;
