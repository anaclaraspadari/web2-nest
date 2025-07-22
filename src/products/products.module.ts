/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { DepartmentService } from 'src/department/department.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PermissionsService,DepartmentService, PrismaService],
})
export class ProductsModule {}
