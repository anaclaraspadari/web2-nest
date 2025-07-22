/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DepartmentService } from 'src/department/department.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService,PermissionsService,DepartmentService, PrismaService],
})
export class ReportsModule {}
