/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Profile } from 'generated/prisma';
import { PROFILES_KEY } from 'src/decorator/profile.decorator';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredProfiles = this.reflector.getAllAndOverride<Profile[]>(PROFILES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredProfiles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredProfiles.some((profile) => user.profile?.includes(profile));
  }
}
