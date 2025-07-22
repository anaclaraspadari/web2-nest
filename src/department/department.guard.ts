/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PermissionsService } from "src/permissions/permissions.service";
import { DepartmentService } from "./department.service";
import { DEPARTMENTS_KEY } from "src/decorator/department.decorator";
import { Department } from "generated/prisma";

@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
    private departmentService: DepartmentService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("Iniciando department guard")
    
    // aqui tava retornando como undefined
    const requiredDepartments =
      this.reflector.get<Department[]>(DEPARTMENTS_KEY, context.getHandler()) ??
      this.reflector.get<Department[]>(DEPARTMENTS_KEY, context.getClass());

    //essa linha aqui eu foi uma tentativa pro requiredDepartments nao retornar mais undefined (pra isso deu certo)
    //const requiredDepartments=await this.departmentService.findAll()

    console.log("Required departments: "+requiredDepartments)
    if (!requiredDepartments) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("Dados do user: "+user)
    console.log('O profile eh: '+user.profile)

    if(!user){
      throw new UnauthorizedException()
    }

    if (user.profile === 'ADMIN' || user.profile === 'SUPERUSER') {
      return true;
    }

    console.log("Id do usuario: ")
    console.log(user.id)

    const permissions = await this.permissionsService.accessUserPermissions(user.id);
    // console.log(permissions)
    const hasUserId=permissions.map((permission)=>permission.user.id)
    console.log("Id que ta pegando: ")
    console.log(hasUserId)


    const departmentNames = permissions.map((permission) => permission.department.name);
    console.log("Department names: "+departmentNames)

    //isso aqui foi uma tentativa de barrar caso o id que o permissions pegasse nao fosse igual ao id do user que tava tentando acessar
    //sempre barra pq o user.id ta voltando undefined
    // if(user.id!=hasUserId){
    //   throw new UnauthorizedException()
    // }

    return requiredDepartments.some((requiredDepartment) =>
      departmentNames.includes(requiredDepartment.name)
    );
  }
}
