import express, { Router } from "express";
const router = Router();
import memberController from "./controllers/member.controller";

/** Member */
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);

export default router;
