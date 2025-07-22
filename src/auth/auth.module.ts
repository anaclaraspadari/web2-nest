/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../guards/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [UsersModule, JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions:{expiresIn: '600s'}})],
  controllers: [AuthController],
  providers: [AuthService,UsersService,PrismaService,{provide: APP_GUARD,useClass: AuthGuard,}],
  exports: [AuthService]
})
export class AuthModule {}
