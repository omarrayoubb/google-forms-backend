import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
// import { User, UserSchema } from 'src/schemas/user.schema';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: (ConfigService: ConfigService) => {
        return {
          secret: ConfigService.get<string>('SECRET_KEY'),
          signOptions: {
            expiresIn: ConfigService.get<string>('SESSION_EXPIRATION'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
