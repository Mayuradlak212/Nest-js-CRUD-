import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { User } from './schema/User';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserAuth implements NestMiddleware {
  // Inject the User model using @InjectModel
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  // Middleware to verify JWT token
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract the token from the Authorization header (Bearer token)
      const token = req.headers['authorization']?.split(' ')[1]; // e.g., Bearer <token>

      if (!token) {
        throw new HttpException('Authorization token is missing', HttpStatus.FORBIDDEN);
      }

      // Verify the token using JWT and decode it
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret from environment variable

      // Check the decoded token, ensure it contains the necessary fields
      console.log('Decoded JWT:', decoded);

      // Use the decoded user ID (assuming the token contains `_id` field)
      const user = await this.userModel.findById(decoded.id);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      // Attach the user object to the request for use in subsequent route handlers
    //   req.user = user;

      // Pass control to the next middleware or route handler
      next();
    } catch (error) {
      // Handle any errors (e.g., invalid token or user not found)
      throw new HttpException('Invalid token or user not found', HttpStatus.UNAUTHORIZED);
    }
  }
}
