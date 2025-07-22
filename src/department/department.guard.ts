/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { Department } from "generated/prisma";
// import { DEPARTMENTS_KEY } from "src/decorator/department.decorator";
import { PermissionsService } from "src/permissions/permissions.service";
import { DepartmentService } from "./department.service";

@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
    private departmentService: DepartmentService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("Iniciando department guard")
    /*const requiredDepartments = this.reflector.getAll<Department[]>(
      DEPARTMENTS_KEY,
      [context.getHandler(), context.getClass()]
    );*/

    // const requiredDepartments =
    //   this.reflector.get<Department[]>(DEPARTMENTS_KEY, context.getHandler()) ??
    //   this.reflector.get<Department[]>(DEPARTMENTS_KEY, context.getClass());

    const requiredDepartments=await this.departmentService.findAll()

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

    const permissions = await this.permissionsService.accessUserPermissions(user.id);
    console.log(permissions)
    const departmentNames = permissions.map((permission) => permission.department.name);
    console.log("Department names: "+departmentNames)

    return requiredDepartments.some((requiredDepartment) =>
      departmentNames.includes(requiredDepartment.name)
    );
  }
}
