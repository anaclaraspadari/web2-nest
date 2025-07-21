/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Department } from "generated/prisma";
import { DEPARTMENTS_KEY } from "src/decorator/department.decorator";
import { PermissionsService } from "src/permissions/permissions.service";

@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredDepartments = this.reflector.getAllAndOverride<Department[]>(
      DEPARTMENTS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredDepartments) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.profile === 'ADMIN' || user.profile === 'SUPERUSER') {
      return true;
    }

    const permissions = await this.permissionsService.accessUserPermissions(user.userId);
    const departmentNames = permissions.map((permission) => permission.department.name);

    return requiredDepartments.some((requiredDepartment) =>
      departmentNames.includes(requiredDepartment.name)
    );
  }
}
