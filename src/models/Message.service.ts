import Errors, { HttpCode, Message } from "../libs/Errors";
import { MessageInput, Messages } from "../libs/types/message";
import MessageModel from "../schema/Message.model";
import axios from "axios"; 


class MessageService {
  private readonly messageModel;
  private  readonly adminChatId
  private readonly telegramBotToken
  constructor() {
    this.messageModel = MessageModel;
    this.adminChatId = process.env.ADMIN_CHAT_ID as string; 
    this.telegramBotToken = process.env.TELEGRAM_BOT_TOKEN as string
  }


  public async createMessage(input: MessageInput): Promise<Messages> {
    try {
      const newMessage = await this.messageModel.create(input); 

      await this.notifyAdmin(newMessage);

      return newMessage; 
    } catch (err) {
      console.error("Error in createMessage:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED); 
    }
  }


  private async notifyAdmin(message: Messages): Promise<void> {
    const url = `https://api.telegram.org/bot${ this.telegramBotToken}/sendMessage`; 
    const text = `New Client:\n\nFull Name: ${message.fullName}\nPhone: ${message.phone}\nCity: ${message.city}\nCreated At: ${message.createdAt.toISOString()}`; 

    try {
      await axios.post(url, {
        chat_id: this.adminChatId, 
        text: text, 
      });
      console.log("Notification sent to admin via Telegram"); 
    } catch (error) {
      console.error("Failed to send notification to admin:", error); 
    }
  }



  public async getMessages(): Promise<Messages[]> {
    const result = await this.messageModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
}

export default MessageService;
