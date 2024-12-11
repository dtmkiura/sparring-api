import { NextFunction, Request, Response } from "express";
import { User } from "../../db/models";
import * as bcrypt from 'bcryptjs';
import { generateJWT } from "../../middlewares/jwtService";


const Register = async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body;
    const { name, email, role } = body;

    let password = body.password;

    password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const tempUser = new User({ name, email, password, role });

    try {
        const userReference = await tempUser.save();
        const { _id, role } = userReference;
        const token = await generateJWT({ uid: _id, rol: role })
        
        res.status(200).json({
            message: 'User has been registered', user: {
                name: userReference.name,
                email: userReference.email,
                token
            }
        });
        
        return;
    } catch (err) {
        next(err)
    }

}

export default Register;