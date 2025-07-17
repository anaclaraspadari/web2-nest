/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";
//import { IS_PUBLIC_KEY } from "src/decorator/public.decorator";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorator/role.decorator";
import { Profile } from "generated/prisma";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService,private reflector: Reflector){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);
        // if (isPublic) {
        //     return true;
        // }
        const requiredRoles = this.reflector.getAllAndOverride<Profile[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const request=context.switchToHttp().getRequest();
        const token=this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException()
        }
        try{
            const payload = await this.jwtService.verifyAsync(token,{secret: jwtConstants.secret})
            request['user']=payload;
        }catch{
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string|undefined{
        const [type,token]=request.headers.authorization?.split(' ')??[];
        return type==='Bearer' ? token : undefined
    }
}