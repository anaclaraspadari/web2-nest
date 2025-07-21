/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { PrismaService } from 'src/prisma.service';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  controllers: [FinancesController],
  providers: [FinancesService, PermissionsService,PrismaService],
})
export class FinancesModule {}
