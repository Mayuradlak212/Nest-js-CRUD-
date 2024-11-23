import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/User'; // Import User and UserSchema
import { AuthService } from 'src/auth/auth.service';
import { UserAuth } from './user.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema
  
  ],
  providers: [UsersService,AuthService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(UserAuth).forRoutes("users")
  }
}  
   