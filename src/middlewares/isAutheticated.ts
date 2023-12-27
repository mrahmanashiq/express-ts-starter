import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'unauthorized'});
        }

        const decoded = <$jwtPayload>JWT.verify(token, 'secret');
        console.log(decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
}