import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/types';


export const verifyToken = (req: Request, res: Response, next: NextFunction) : void => {
    let token = req.headers.authorization;

    if (!token) {
        res.status(401).json({ error: "Token faltante" });
        return
    }

    // Limpio el token -> 'Bearer infoDeltoken'
    token = token.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        if (!decoded || !decoded.tokenEmail) {
            throw new Error("Invalid token structure");
        }

        req.body.data = decoded.tokenEmail;
        next();
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
};
