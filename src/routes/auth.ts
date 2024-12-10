import { Router } from 'express';
import { FieldValidator } from '../middlewares/FieldValidator';
import { check } from 'express-validator';
import  Login  from '../controllers/auth/login';
import  Register  from '../controllers/auth/register';

const app = Router();

app.post('/register', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    FieldValidator], Register)


app.post('/login', [
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    FieldValidator], Login)

export default app;