import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register.dto';
import { UserSchema, User } from './schema/User';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private readonly auth:AuthService) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll():Promise<any> {
    const data  =await this.userModel.find();

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async register(registerDto: RegisterUserDto): Promise<any> {
    console.log("Body ",registerDto);
    const hashedPassword = await this.auth.hashPassword(registerDto.password) // Using bcrypt to hash the password
    const data = { ...registerDto, password: hashedPassword };
    const savedData = await this.userModel.create(data);
    await savedData.save()


    return savedData;
  }
  async login(loginDto: LoginUserDto):Promise<any>{
      try {
          const user = await this.userModel.findOne({email: loginDto.email});
          if(!user){
              return Promise.reject("User not found");
          }
          const token =await this.auth.generateToken (user.email,user._id);
          user.token = token;
         const savedData=  await user.save();
          return {message:"LoggedIn Successfully",data:savedData,token}
      } catch (error) {
        return {message:"Internal Error",error:error.message}
      }  
  }
}
