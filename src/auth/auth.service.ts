import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';  // You can use 'bcrypt' or 'bcryptjs'
import { sign } from 'jsonwebtoken'; // Correctly import 'sign' from 'jsonwebtoken'

@Injectable()
export class AuthService {

  private readonly saltRounds = 10; // The number of rounds to use when generating a salt

  // Method to hash a password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  // Method to compare a password with the hashed version
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Method to generate a JWT token
  async generateToken(email: string, id: any): Promise<string> {
    const user = { email, id };
    const token = sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}
