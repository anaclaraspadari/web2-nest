/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Module } from "generated/prisma";
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate{
    constructor (private reflector: Reflector, private prisma: PrismaService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("Iniciando o PermissionsGuard");
        const requiredModules = this.reflector.get<Module[]>(
            'modules',
            context.getHandler(),
        );
        if (!requiredModules) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("Entrou na validação das permissoes")
        if (!user) {
            return false;
        }
        if (user.profile === 'SUPERUSER' || user.profile==='ADMIN') {
            return true;
        }
        const userPermissions = await this.prisma.permissionsUser.findMany({
            where: { userId: user.id },
        });
        return requiredModules.some(module => 
            userPermissions.some(perm => perm.module === module)
        );
    }
}