/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({data: createDepartmentDto});
  }

  findAll() {
    return this.prisma.department.findMany({
      select:{
        id: true,
        name: true
      },
    });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({
      where:{
        id:id,
      },
      select:{
        id: true,
        name: true
      },
    });
  }

  remove(id: number) {
    return this.prisma.department.delete({
      where:{
        id:id,
      },
    });
  }
}
