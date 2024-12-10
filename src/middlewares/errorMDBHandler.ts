import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

interface CustomError {
    code: number;
    keyPattern: {
        [key: string]: number;
    };
    keyValue: {
        [key: string]: number;
    };
}


const errorMDBHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let stack: any[] = [];

    if (err.name === 'MongoServerError') {
        const error: MongooseError & CustomError = err;
        switch (error.code) {
            case 11000:
                statusCode = 409;
                stack: [];
                message = `${Object.keys(error.keyPattern)[0]} ${error.keyValue[Object.keys(error.keyPattern)[0]]} already exists`;
                break;
            default:
                statusCode = 503;
                message = 'DB Service Unavailable';
                stack = err;
                break;
        }

        res.status(statusCode).json({
            message: message,
            details: error.message || "Not aditional information",
            stack
        });

    } else if(err.name === 'CastError' && err.kind == 'ObjectId') {
        statusCode = 400;
        message = 'Invalid ObjectId';
        res.status(statusCode).json({
            message, 
            details: err.message
        });
    }else {
        res.status(statusCode).json({
            message: message, 
            err
        });
    }
};

export default errorMDBHandler;
