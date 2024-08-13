import { Request } from 'express';
import { IUser } from '../models/userModel'; // Assuming you have an IUser interface in your user model file

// Extend the Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user: IUser;
}
