/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { DepartmentService } from 'src/department/department.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService,DepartmentService, UsersService,PrismaService],
  exports:[PermissionsService]
})
export class PermissionsModule {}
