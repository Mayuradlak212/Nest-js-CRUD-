import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {UsersModule} from './users/users.module'
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the config globally available throughout your application
    }),

    // Connect to MongoDB using the connection URL from the environment variables
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'), 
        // Get the MongoDB URI from the environment
      }),
      
      inject: [ConfigService], // Inject the ConfigService to access the environment variable
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
