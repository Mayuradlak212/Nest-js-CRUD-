import { Controller, Get, Post, Body, Patch, Param, Delete, RawBody } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }   

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }  
  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    // The body is already parsed into an object and passed as 'registerDto'
    return this.usersService.register(registerDto);
  }
  @Post("login")
  async login(@Body() loginDto: { email: string; password: string }) {
    // The body is already parsed into an object and passed as 'loginDto'
    return this.usersService.login(loginDto);
  }
}
