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
exports.userRouter = void 0;
const express_1 = require("express");
// import { Request, Response } from "express";
const db_1 = require("../db");
const db_2 = require("../db");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = require("../middleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredFields = zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        username: zod_1.z.string().email(),
        password: zod_1.z.string(),
    });
    const parsedData = requiredFields.safeParse(req.body);
    if (!parsedData) {
        return res.status(400).json({
            message: "Validation error",
        });
    }
    const { firstName, lastName, username, password } = req.body;
    try {
        const existingUser = yield db_1.User.findOne({
            username: req.body.username
        });
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            });
        }
        const user = yield db_1.User.create({
            firstName,
            lastName,
            username,
            password
        });
        const userId = user._id;
        yield db_2.Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        });
        const token = jsonwebtoken_1.default.sign({
            userId,
        }, config_1.JWT_SECRET);
        res.json({
            message: "Sign up succeed",
            token: token
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            error: e instanceof Error ? e.message : "Unknown error",
        });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signinBody = zod_1.z.object({
        username: zod_1.z.string().email(),
        password: zod_1.z.string()
    });
    const success = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "incorrect inputs"
        });
    }
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({
        username,
        password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            userId: user._id
        }, config_1.JWT_SECRET);
        res.json({
            token: token
        });
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    });
}));
const updateBody = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    password: zod_1.z.string().optional()
});
exports.userRouter.put("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsBody = updateBody.safeParse(req.body);
    if (!parsBody) {
        return res.status(400).json({
            message: "Validation error while updating",
        });
    }
    yield db_1.User.updateOne({
        _id: req.userId
    }, req.body);
    res.json({
        message: "Updated successfully"
    });
}));
exports.userRouter.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || "";
    const users = yield db_1.User.find({
        $or: [{
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstNmae: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
}));
