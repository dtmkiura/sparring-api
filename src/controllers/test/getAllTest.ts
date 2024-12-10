import { NextFunction, Request, Response } from 'express';
import { Test } from '../../db/models';

const GetAllTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tests = await Test.find();
        if (!tests) {
            res.status(204).json({ message: 'No tests content' });
            return ; 
        }
        res.status(200).json({ tests });
        return ; 
    } catch (err) {
        next(err)
    }
}


export default GetAllTest;