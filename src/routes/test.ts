import {Router} from 'express';
import { check } from 'express-validator';
import { verifyJWT } from '../middlewares/jwtService';
import { isRecruiter } from '../middlewares/rolVerified';
import CreateTest from '../controllers/test/createTest';
import GetAllTest from '../controllers/test/getAllTest';
import GetOneTest from '../controllers/test/getOneTest';
import DeleteTest from '../controllers/test/deleteTest';
import { FieldValidator } from '../middlewares/FieldValidator';

const app = Router();

app.post('/', [
    verifyJWT, 
    isRecruiter,
    check('name').not().isEmpty().withMessage('Name is required'),
    check('question').not().isEmpty().withMessage('Question is required'),
    check('type').not().isEmpty().withMessage('Type is required'),
    check('type').isIn(['question', 'code']).withMessage('Type is invalid try with question or code'),
    check('tags').not().isEmpty().withMessage('Tags is required'),
    check('tags').isArray().withMessage('Tags is invalid must be an array'),
    FieldValidator
], CreateTest) 

app.get('/', [verifyJWT] , GetAllTest)

app.get('/:id', [verifyJWT] , GetOneTest)
app.delete('/:id', [verifyJWT, isRecruiter] , DeleteTest)

export default app;