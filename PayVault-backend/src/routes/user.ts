import express, { Router } from "express";

export const userRouter = Router();


userRouter.get("/user", (req, res) => {
    res.json({
        message: "user route"
    })
}
);


