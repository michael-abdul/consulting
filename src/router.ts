import express, { Router } from "express";
const router = Router();
import memberController from "./controllers/member.controller";

/** Member */
router.get("/member/store", memberController.getStore);
router.get("/member/signup", memberController.signup);
router.get("/member/login", memberController.login);

export default router;
