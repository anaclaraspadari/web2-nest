/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService,UsersService,PermissionsService,PrismaService],
  exports: [DepartmentService]
})
export class DepartmentModule {}
