import express, { Router } from "express";
import { authMiddleware } from "../middleware";
import { Account } from "../db";



export const accountRouter = Router();

accountRouter.get("/balance",authMiddleware,async (req: any, res: any) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account?.balance
    })
})