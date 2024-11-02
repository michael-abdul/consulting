
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ArticleModel from "../schema/Article.model";
import { Article, ArticleInput, ArticleInquiry, ArticleUpdate } from "../libs/types/article";

class ArticleService {
  private readonly articleModel;

  constructor() {
    this.articleModel = ArticleModel;
  }
  public async createNewArticle(input: ArticleInput): Promise<Article> {
    try {
      return await this.articleModel.create(input);
    } catch (err) {
      console.error("Error, model: createNewArticle:", err);

      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  public async getArticles(): Promise<Article[]> {
    const result = await this.articleModel.find()
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  public async getArticle(memberId: ObjectId | null, id: string): Promise<Article> {
    const articleId = shapeIntoMongooseObjectId(id);
    let result = await this.articleModel.findOne({ _id: articleId }).exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateArticle(
    id:string,
    input: ArticleUpdate
  ): Promise<Article> {
    const articleId = shapeIntoMongooseObjectId(id);
    const result = await this.articleModel
      .findOneAndUpdate(
        {
          _id: articleId,
        },
        input,
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
  public async removeArticle(id: string): Promise<Article> {
    const articleId  = shapeIntoMongooseObjectId(id)
		const search: T = { _id: articleId };
		const result = await this.articleModel.findOneAndDelete(search).exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.REMOVE_FAILED);

		return result;
	}

}

export default ArticleService;
