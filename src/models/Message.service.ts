import Errors, { HttpCode, Message } from "../libs/Errors";
import { MessageInput, Messages } from "../libs/types/message";
import MessageModel from "../schema/Message.model";
import axios from "axios"; 


class MessageService {
  private readonly messageModel;
  private  readonly adminChatId
  private readonly telegramBotToken
  private readonly notionDataBase
  private readonly notionToken

  constructor() {
    this.messageModel = MessageModel;
    this.adminChatId = process.env.ADMIN_CHAT_ID as string; 
    this.telegramBotToken = process.env.TELEGRAM_BOT_TOKEN as string
    this.notionDataBase = process.env.NOTION_DATABASE_ID as string
    this.notionToken = process.env.NOTION_TOKEN as string

  }


  public async createMessage(input: MessageInput): Promise<Messages> {
    try {
      const newMessage = await this.messageModel.create(input);

      // Notify admin via Telegram
      await this.notifyAdmin(newMessage);

      // Add entry to Notion database
      await this.addToNotion(newMessage);

      return newMessage;
    } catch (err) {
      console.error("Error in createMessage:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  private async notifyAdmin(message: Messages): Promise<void> {
    const url = `https://api.telegram.org/bot${this.telegramBotToken}/sendMessage`; 
    const formattedDate = message.createdAt.toLocaleDateString('en-GB');
    const text = `New Client:\n\nFull Name: ${message.fullName}\nPhone: ${message.phone}\nDate: ${formattedDate}`; 
  
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
  

  private async addToNotion(message: Messages): Promise<void> {
    const url = `https://api.notion.com/v1/pages`;
    const headers = {
      "Authorization": `Bearer ${this.notionToken}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    };

    const data = {
      parent: { database_id:this.notionDataBase},
      properties: {
        FullName: {
          title: [
            {
              text: {
                content: message.fullName,
              },
            },
          ],
        },
        Phone: {
          rich_text: [
            {
              text: {
                content: message.phone,
              },
            },
          ],
        },
        CreatedAt: {
          date: {
            start: message.createdAt.toISOString(),
          },
        },
      },
    };

    try {
      await axios.post(url, data, { headers });
      console.log("Message added to Notion database successfully");
    } catch (error:any) {
      console.error("Failed to add message to Notion:", error.response?.data || error.message);
    }
  }
  
  public async getMessages(): Promise<Messages[]> {
    const result = await this.messageModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
}

export default MessageService;
