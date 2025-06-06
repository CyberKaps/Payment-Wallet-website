import express, { Router } from "express";
// import { Request, Response } from "express";
import { User } from "../db";
import { Account } from "../db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../middleware";

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

        const existingUser = await User.findOne({
            username: req.body.username
        })
    
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken"
            })
        }

        const user = await User.create({
            firstName,
            lastName,
            username,
            password
        })

        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
        
        const token = jwt.sign({
            userId,   
        }, JWT_SECRET)


        res.json({
        message: "Sign up succeed",
        token: token
    })

    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            error: e instanceof Error ? e.message : "Unknown error",
        });
    }

    
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
    const user = await User.findOne({
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

const updateBody = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional()
    })
    
userRouter.put("/",authMiddleware, async (req: any, res: any) => {
    

    const parsBody = updateBody.safeParse(req.body);
    if (!parsBody) {
        return res.status(400).json({
            message: "Validation error while updating",
        });
    }

    await User.updateOne({
        _id: req.userId
    }, req.body)

    res.json({
        message: "Updated successfully"
    })
})

userRouter.get("/bulk",async (req: any, res: any) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName: {
                "$regex": filter
            }
        },
        {
            lastName: {
                "$regex": filter
            }
        }]

    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstNmae: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})