import express, { Router } from "express";
// import { Request, Response } from "express";
import { userModel } from "../db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";

export const userRouter = Router();


userRouter.post("/signup", async (req: any, res: any) => {

    const requiredFields = z.object({
        firstName: z.string(),
        lastName: z.string(),
        username: z.string().email(),
        password: z.string(),
    });

    const parsedData = requiredFields.safeParse(req.body);
    if (!parsedData) {
        return res.status(400).json({
            message: "Validation error",
        });
    }

    const { firstName, lastName, username, password } = req.body;

    try{

        const existingUser = await userModel.findOne({
            username: req.body.username
        })
    
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            })
        }

        const user = await userModel.create({
            firstName,
            lastName,
            username,
            password
        })

        const userId = user._id;
        const token = jwt.sign({
            userId,   
        }, JWT_SECRET)

    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            error: e instanceof Error ? e.message : "Unknown error",
        });
    }

    res.json({
        message: "Sign up succeed",
        token: "token"
    })
}
);

userRouter.post("/signin",async (req:any, res: any) => {

    const signinBody = z.object({
        username: z.string().email(),
        password: z.string()
    })

    const success = signinBody.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }

    const {username, password} = req.body;
    const user = await userModel.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

     res.status(411).json({
        message: "Error while logging in"
    })
})

