import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/notAuthorized';

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

        let token: string | undefined = req.header("Authorization");

        if (!token) {
            throw new NotAuthorizedError();
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        const verified: any = jwt.verify(token!, process.env.JWT_KEY!);
        req.user = verified;
        next();

};
