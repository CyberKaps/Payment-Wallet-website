"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
exports.accountRouter = (0, express_1.Router)();
exports.accountRouter.get("/balance", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield db_1.Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account === null || account === void 0 ? void 0 : account.balance
    });
}));
exports.accountRouter.post("/transfer", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = mongoose_1.default.startSession();
    (yield session).startTransaction();
    const { amount, to } = req.body;
    // Fetch the accounts within the transaction
    const account = yield db_1.Account.findOne({ userId: req.userId }).session(yield session);
    if (!account || account.balance < amount) {
        (yield session).abortTransaction();
        return res.status(400).json({
            message: "insufficient balance"
        });
    }
    const toAccount = yield db_1.Account.findOne({ userId: to }).session(yield session);
    if (!toAccount) {
        (yield session).abortTransaction();
        return res.status(400).json({
            message: "invalid account"
        });
    }
    //perform the transfer
    yield db_1.Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(yield session);
    ``;
    yield db_1.Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(yield session);
    //commit the transaction
    yield (yield session).commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}));
