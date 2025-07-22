/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
    console.log("Começo do ProfileGuard");
    const requiredProfiles = this.reflector.getAllAndOverride<Profile[]>(PROFILES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredProfiles);
    if (!requiredProfiles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const profile = request.user;
    console.log("O profile eh: "+profile.profile);
    return requiredProfiles.includes(profile.profile);
  }
}
