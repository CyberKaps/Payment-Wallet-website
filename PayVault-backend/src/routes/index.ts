import { Router } from "express";
import express from "express";
import { userRouter } from "./user";

export const router = Router();

router.use("/user", userRouter);

router
