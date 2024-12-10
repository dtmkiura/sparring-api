import { NextFunction, Request, Response } from "express";
import { User } from "../../db/models";
import * as bcrypt from 'bcryptjs';
import { generateJWT } from "../../middlewares/jwtService";


const Register = async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body;
    const { name, email } = body;

    let password = body.password;

    let role: 'Recruiter' | 'Candidate' ;
    const count = await User.countDocuments();
    if (count > 0) role = 'Candidate';

    else role = 'Recruiter';
    password =  bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const tempUser = new User({ name, email, password, role });

    try {
        const userReference = await tempUser.save();
        const {_id} = userReference ; 
        const token  = await generateJWT(_id as string)
        res.status(200).json({ message: 'User has been registered' , token});
        return ; 
    } catch (err) {
        next(err)
    }

}

export default Register;