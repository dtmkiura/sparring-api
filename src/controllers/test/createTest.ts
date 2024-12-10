import { NextFunction, Request, Response } from 'express';
import { Test } from '../../db/models';

const CreateTest = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { name, question, solution, type, tags } = body;
    if(type === 'code' && !solution){
        res.status(412).json({ message: 'La solución es obligatoria para el tipo de test código' });
        return ; 
    }

    const tempTest = new Test({ name, question, solution, type, tags });

    try {
        const testReference = await tempTest.save();
        res.status(200).json({ message: 'Test has been created' });
        return ; 
    } catch (err) {
        next(err)
    }

}

export default CreateTest;