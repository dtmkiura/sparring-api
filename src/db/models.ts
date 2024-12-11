import mongoose, { Document, Schema } from 'mongoose';

// Interface for the User model
export interface IUser extends Document {
  name: string; 
  email: string;
  password: string;
  sessionToken?: string;
  role: 'Recruiter' | 'Candidate';  
}

// Schema for the User model
const UserSchema: Schema = new Schema({
  name: { type: String, required: true , unique: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  sessionToken: { type: String  , nullable: true },
  role: { type: String, enum: ['Recruiter', 'Candidate'], required: true }, 
});


export enum TestType{
  question = 'question',
  code = 'code'
}
// Interface for the test model
export interface ITest  extends Document { 
  name: string ;
  question: string ; 
  solution: string ; 
  type: TestType, 
  tags: string[] ;
  createdAt: Date ;
}

// Schema for the test model
const TestSchema: Schema = new Schema({
  name: { type: String, required: true  , unique: true },
  question: { type: String, required: true  , unique: true },
  solution: { type: String, required: false }, 
  type: { type: String, enum: [TestType.question, TestType.code], required: true }, 
  tags: { type: Array, required: true, default: [] },
  createdAt: { type: Date, default: Date.now },
});

// Export the models
export const User = mongoose.model<IUser>('User', UserSchema);
export const Test = mongoose.model<ITest>('Test', TestSchema);

