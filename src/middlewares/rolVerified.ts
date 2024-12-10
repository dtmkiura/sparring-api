import { Request, Response, NextFunction } from 'express';

export const isRecruiter = (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== 'Recruiter') {
        res.status(403).json({ message: 'You need to be a Recluter to access this resource' });
    }else{
        next();
    }    
};

export const isCandidate = (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== 'Candidate') {
        res.status(403).json({ message: 'You need to be a Candidate to access this  resource ' });
    }else{
        next();
    }    
};