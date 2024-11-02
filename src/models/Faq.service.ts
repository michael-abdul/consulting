import { Faq, FaqInput, FaqInquiry, FaqUpdate } from "../libs/types/faq";
import FaqModel from "../schema/Faq.model";
import { ObjectId } from "mongoose";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { FaqStatus } from "../libs/enums/faq.enum";
import { shapeIntoMongooseObjectId } from "../libs/config";

class FaqService {
  private readonly faqModel;

  constructor() {
    this.faqModel = FaqModel;
  }
  public async createFaq( input: FaqInput): Promise<Faq> {
    try {
      const result = await this.faqModel.create(input);
      return result;
    } catch (err) {
      console.log("Error service.model:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getFaq(memberId: ObjectId, id: string): Promise<Faq> {
    const faqId = shapeIntoMongooseObjectId(id);
    
    const search: T = {

        _id: faqId,
        faqStatus: FaqStatus.ACTIVE,
    };

    const result: Faq = await this.faqModel.findOne(search).lean().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

return result
}

public async getFaqs(): Promise<Faq[]> {
  const result = await this.faqModel.find()
  .exec();

if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
return result;
}
  public async updateFaq(
    id:string,
    input: FaqUpdate
  ): Promise<Faq> {
    const faqId = shapeIntoMongooseObjectId(id);
    const result = await this.faqModel
      .findOneAndUpdate(
        {
          _id: faqId,
        },
        input,
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
  public async removeFaq(id: string): Promise<Faq> {
    const faqId  = shapeIntoMongooseObjectId(id)
		const search: T = { _id: faqId };
		const result = await this.faqModel.findOneAndDelete(search).exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.REMOVE_FAILED);

		return result;
	}
}

export default FaqService