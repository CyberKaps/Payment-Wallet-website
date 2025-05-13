
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {

    const authHeader = req.headers['authorization'] as string | undefined;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    } catch(err) {
        return res.status(403).json({});
    }
}