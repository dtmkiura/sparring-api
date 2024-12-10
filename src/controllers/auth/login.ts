import { NextFunction, Request, Response } from 'express';
import { User } from '../../db/models';
import * as bcrypt from 'bcryptjs';
import { generateJWT } from '../../middlewares/jwtService';

const Login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let tempUser ; 
    try {
        tempUser = await User.findOne({ email });
        if (!tempUser) {
            res.status(401).json({ message: 'Verify your email and password' });
            return ; 
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, tempUser.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Verify your email and password' });
            return ; 
        }

        const token = await generateJWT(tempUser.id);
        res.status(200).json({ token });
        return  ; 

    } catch (error) {
        next(error);
    }   
}

export default Login;