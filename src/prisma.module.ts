/* eslint-disable prettier/prettier */
import { Module, Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {}

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}