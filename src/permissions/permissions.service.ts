/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsService {
    constructor(private prisma: PrismaService){}
    grantPermission(userId: number, departmentId: number){
        return this.prisma.permissions.create({
            data:{
                userId,
                departmentId
            }
        });
    }
    accessUserPermissions(userId: number){
        return this.prisma.permissions.findMany({
            where: {
                userId:userId
            },
            select:{
                user: true,
                department: true
            }
        })
    }
    removeUserPermissions(userId: number){
        return this.prisma.permissions.delete({
            where:{
                userId:userId
            }
        })
    }
}
