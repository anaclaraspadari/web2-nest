/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
 
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({data: createProductDto});
  }

  findAll() {
    return this.prisma.product.findMany({
      select:{
        id: true,
        name: true,
      }
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where:{
        id:id,
      },
      select:{
        id: true,
        name:true
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: updateProductDto.name
      }
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where:{
        id: id,
      },
    });
  }
}
