import { NextFunction, Request, Response } from 'express';
import { Test } from '../../db/models';

const GetOneTest = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const test = await Test.findById(id);
        if (!test) {
            res.status(404).json({ message: 'Test not found' });
            return ; 
        }
        res.status(200).json({ test });
        return ; 
    } catch (err) {
        next(err)
    }
}


export default GetOneTest;