/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class FinancesService {
  constructor(private prisma: PrismaService) {}
  create(createFinanceDto: CreateFinanceDto) {
    return this.prisma.finance.create({data: createFinanceDto});
  }

  findAll() {
    return this.prisma.finance.findMany({
      select:{
        id: true,
        type:true,
        description:true,
        price:true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.finance.findUnique({
      where:{
        id:id,
      },
      select:{
        id: true,
        type:true,
        description:true,
        price:true,
      },
    });
  }

  update(id: number, data: Prisma.FinanceUpdateInput) {
    return this.prisma.finance.update({
      where:{id:id},
      data,
    })
  }

  remove(id: number) {
    return this.prisma.finance.delete({
      where:{
        id:id,
      },
    });
  }
}
