/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Module } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsService {
    constructor(private prisma:PrismaService){}
    async grantPermission(userId: number, module: Module){
        return this.prisma.permissionsUser.create({
            data:{
                userId,
                module,
            }
        });
    }
    async revokePermission(userId: number, module: Module){
        return this.prisma.permissionsUser.delete({
            where:{
                userId,
                module
            }
        })
    }
    async listPermissions(userId: number){
        return this.prisma.permissionsUser.findMany({
            where:{
                userId
            }
        })
    }
}
