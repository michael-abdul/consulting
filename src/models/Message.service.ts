import Errors, { HttpCode, Message } from "../libs/Errors";
import { MessageInput, Messages } from "../libs/types/message";
import MessageModel from "../schema/Message.model";

class MessageService {
  private readonly messageModel;
  constructor() {
    this.messageModel = MessageModel;
  }
  public async createMessage(input: MessageInput): Promise<Messages> {
    try {
      return await this.messageModel.create(input);
    } catch (err) {
      console.error("Error, model: createMessage:", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getMessages(): Promise<Messages[]> {
    const result = await this.messageModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
}

export default MessageService;
