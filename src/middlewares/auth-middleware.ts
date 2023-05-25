import { env } from "process";
import { Response } from 'express';

import { Secret, verify } from "jsonwebtoken";

export default function (req: any, res: Response, next: any) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Not autorized"})
        }
        const decodedData = verify(token, process.env.SECRET_KEY as Secret);
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Not autorized"})
    }
};