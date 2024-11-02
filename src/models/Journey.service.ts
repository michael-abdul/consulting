
import { ObjectId } from "mongoose";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { FaqStatus } from "../libs/enums/faq.enum";
import { shapeIntoMongooseObjectId } from "../libs/config";
import JourneyModel from "../schema/Journey.model";
import { Journey, JourneyInput, JourneyInquiry, JourneyUpdate } from "../libs/types/journey";

class JourneyService {
  private readonly journeyModel;

  constructor() {
    this.journeyModel = JourneyModel;
  }
  public async createJourney( input: JourneyInput): Promise<Journey> {
    try {
      const result = await this.journeyModel.create(input);
      return result;
    } catch (err) {
      console.log("Error service.model:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getJourney(memberId: ObjectId, id: string): Promise<Journey> {
    const journeyId = shapeIntoMongooseObjectId(id);
    
    const search: T = {

        _id: journeyId,
        faqStatus: FaqStatus.ACTIVE,
    };

    const result: Journey = await this.journeyModel.findOne(search).lean().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

return result;
}

public async getJourneys(): Promise<Journey[]> {//inquiry: JourneyInquiry
//     const match: any = {};

//     if (inquiry.search) {
//       match.journeyYear = { $regex: new RegExp(inquiry.search, "i") };
//     }
//     let sortField: string = 'updatedAt'; 
//     if (inquiry.sort && inquiry.sort === 'journeyYear') {
//         sortField = 'journeyYear'; 
//     }
//     let sortDirection: 1 | -1 = -1; 
//     if (inquiry.direction === 'asc') {
//         sortDirection = 1; 
//     }
//     if (inquiry.direction === 'desc') {
//         sortDirection = -1; 
//     }
//     const sortCriteria: Record<string, 1 | -1> = { [sortField]: sortDirection };

//     const result = await this.journeyModel
//       .aggregate([
//         { $match: match },
//         { $sort: sortCriteria },
//         { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
//         { $limit: inquiry.limit * 1 },
//       ])
//       .exec();

//     if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
//     return result;
// }
 const result = await this.journeyModel.find()
.exec();

if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
return result;
}


  public async updateJourney(
    id:string,
    input: JourneyUpdate
  ): Promise<Journey> {
    const journeyId = shapeIntoMongooseObjectId(id);
    const result = await this.journeyModel
      .findOneAndUpdate(
        {
          _id: journeyId,
        },
        input,
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
  public async removeJourney(id: string): Promise<Journey> {
    const journeyId  = shapeIntoMongooseObjectId(id)
		const search: T = { _id: journeyId };
		const result = await this.journeyModel.findOneAndDelete(search).exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.REMOVE_FAILED);

		return result;
	}
}

export default JourneyService