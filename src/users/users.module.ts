/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from 'src/permissions/permissions.service';
import { DepartmentService } from 'src/department/department.service';

@Module({
  controllers: [UsersController],
  providers: [JwtService,UsersService,PermissionsService,DepartmentService,PrismaService],
  exports: [UsersService]
})
export class UsersModule {}
