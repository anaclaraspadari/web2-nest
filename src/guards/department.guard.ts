/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionsService } from "src/permissions/permissions.service";
import { DEPARTMENTS_KEY } from "src/decorator/department.decorator";

@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("Iniciando department guard")
    
    const requiredDepartments =
      this.reflector.get<string[]>(DEPARTMENTS_KEY, context.getHandler()) ??
      this.reflector.get<string[]>(DEPARTMENTS_KEY, context.getClass());

    console.log("Required departments: "+requiredDepartments)
    if (!requiredDepartments) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("Dados do user: ")
    console.log(user)
    console.log('O profile eh: '+user.profile)

    if(!user){
      throw new UnauthorizedException()
    }

    if (user.profile === 'ADMIN' || user.profile === 'SUPERUSER') {
      return true;
    }

    console.log("Id do usuario: ")
    console.log(user.sub)

    const permissions = await this.permissionsService.accessUserPermissions(user.sub);
    console.log(permissions)
    const hasUserId=permissions.map((permission)=>permission.user.id)
    console.log("Id que ta pegando: ")
    console.log(hasUserId)


    const departmentNames = permissions.map((permission) => permission.department);
    console.log("Department names: "+departmentNames)

    if(user.sub!=hasUserId){
      throw new UnauthorizedException()
    }

    console.log("validando regra")
    console.log(requiredDepartments[0])
    console.log(departmentNames[0].name)
    //console.log(requiredDepartments[0]== departmentNames[0].name)
    

    return requiredDepartments.some((requiredDepartment) =>
      requiredDepartments.includes(requiredDepartment)
    );
  }
}
