/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { PrismaService } from 'src/prisma.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { DepartmentService } from 'src/department/department.service';

@Module({
  controllers: [FinancesController],
  providers: [FinancesService, PermissionsService,DepartmentService,PrismaService],
})
export class FinancesModule {}
