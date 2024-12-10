import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const FieldValidator = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array()[0].msg;
        res.status(400).json({ msg, errors: errors.array() });
    } else {
        next();
    }
};

export { FieldValidator };
