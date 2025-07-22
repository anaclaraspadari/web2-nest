/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}
  create(createReportDto: CreateReportDto) {
    return this.prisma.report.create({data: createReportDto});
  }

  findAll() {
    return this.prisma.report.findMany({
      select:{
        id:true,
        description: true,
        date: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.report.findUnique({
      where:{
        id:id
      },
      select:{
        description: true,
        date: true
      }
    });
  }

  update(id: number, data: UpdateReportDto) {
    return this.prisma.report.update({
      where:{
        id: id
      },data
    });
  }

  remove(id: number) {
    return this.prisma.report.delete({
      where:{
        id:id
      }
    });
  }
}
