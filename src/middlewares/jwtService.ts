import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../db/models';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            payload: Record<string, any>;
            role: "Recruiter" | "Candidate",
            user_id: string,
        }
    }
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if (!token) {
            res.status(401).json({ msg: "No token provided" });
            return;
        }
        // Verify the token
        const payload = jwt.verify(token, String(process.env.SECRETORPRIVATEKEY)) as Record<string, any>;
        req.payload = payload;
        const { uid } = payload;
        const tempUser = await User.findById(uid);
        if (!tempUser) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        req.role = tempUser.role;
        req.user_id = uid;

        next();
        return ; 
    } catch (err) {
        res.status(403).json({ msg: "The token is not valid" });
        return ;
    }
};

export const generateJWT = (arg: Object) => {
    // This Method are thinking to recive the user ID and generate a JWT
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign(arg, String(process.env.SECRETORPRIVATEKEY), {
                expiresIn: process.env.TOKENEXPIRATION,
                algorithm: 'HS256'
            })
            resolve(token);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};


