/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(CreateUserDto: CreateUserDto) {
    const hashPassword=await bcrypt.hash(CreateUserDto.password,10)
    const user=await this.prisma.user.create({
      data:{
        email: CreateUserDto.email,
        password: hashPassword,
        name: CreateUserDto.name
      }
    });
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findById(id: number) {
    const user=await this.prisma.user.findUnique({
      where:{
        id: id,
      },
      select:{
        id: true,
        name: true,
        email: true
      },
    });
    return user;
  }

  async findByEmail(email: string){
     const user=await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })
    return user;
  }

  async update(id: number, data:Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where:{
        id: id
      },
      data,
    });
  }

  async remove(id: number) {
    const user=await this.prisma.user.delete({
      where:{
        id: id
      }
    })
  }
}
