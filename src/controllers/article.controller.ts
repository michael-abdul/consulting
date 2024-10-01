import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import ArticleService from "../models/Article.service";
import { ArticleInput, ArticleInquiry, ArticleUpdate } from "../libs/types/article";

const articleController: T = {};
const articleService =  new ArticleService();

articleController.createNewArticle = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewArticle");
    console.log( 'data',req.body)
    const data: ArticleInput = req.body;
    if (req.file) data.articleImage = req.file.path.replace(/\\/, "/");

    const result =  await articleService.createNewArticle(data);

    res.status(HttpCode.CREATED).json(result );
  } catch (err) {
    console.log("Error, createNewArticle", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
articleController.getArticles = async (req: Request, res: Response) => {
  try {
    console.log("getArticles");
    const {  page, limit,  search,  } = req.query;
    const inquiry: ArticleInquiry = {
      page: Number(page),
      limit: Number(limit),
    };

    if (search) inquiry.search = String(search);

    const result = await articleService.getArticles(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getArticles", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
articleController.getArticle = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getArticle");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await articleService.getArticle(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getArticle", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
articleController.updateArticle = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateArticle");
    const id = req.params.id
    const input: ArticleUpdate = req.body;
    if (req.file) input.articleImage = req.file.path.replace(/\\/, "/");
    const result = await articleService.updateArticle(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateArticle", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

articleController.removeArticle = async (req: AdminRequest, res: Response) => {
  try {
    console.log("removeArticle");
    const id = req.params.id
    const result = await articleService.removeArticle(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeArticle", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
}
export default articleController;
