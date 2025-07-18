/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PermissionsController],
  providers: [JwtService,PermissionsService,PrismaService],
  exports:[PermissionsService]
})
export class PermissionsModule {}
