import express, { Router } from "express";
import { authMiddleware } from "../middleware";
import { Account } from "../db";
import mongoose from "mongoose";



export const accountRouter = Router();

accountRouter.get("/balance",authMiddleware,async (req: any, res: any) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account?.balance
    })
})


accountRouter.post("/transfer", authMiddleware, async(req: any, res: any) => {
    const session = mongoose.startSession();

    (await session).startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId}).session(await session);

    if(!account || account.balance < amount){
        (await session).abortTransaction();
        return res.status(400).json({
            message: "insufficient balance"
        })
    }

    const toAccount = await Account.findOne({ userId: to}).session(await session);

    if(!toAccount){
        (await session).abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        })
    }

    //perform the transfer
    await Account.updateOne({ userId: req.userId}, { $inc: { balance: -amount }}).session(await session);
    await Account.updateOne({ userId: to}, { $inc: { balance: amount }}).session(await session);

    //commit the transaction
    await (await session).commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})