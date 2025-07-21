/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileGuard } from 'src/auth/profile.guard';
import { Profiles } from 'src/decorator/profile.decorator';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService){}

    @Post()
    @UseGuards(ProfileGuard)
    @Profiles('SUPERUSER','ADMIN')
    @UseGuards(AuthGuard)
    grantPermission(@Param('userId') userId: string, @Param('departmentId') departmentId: string){
        return this.permissionsService.grantPermission(+userId, +departmentId)
    }

    @Get()
    @UseGuards(ProfileGuard)
    @Profiles('SUPERUSER','ADMIN')
    @UseGuards(AuthGuard)
    accessUserPermissions(@Param('userId') userId: string){
        return this.permissionsService.accessUserPermissions(+userId)
    }

    @Delete()
    @UseGuards(ProfileGuard)
    @Profiles('SUPERUSER','ADMIN')
    @UseGuards(AuthGuard)
    removeUserPermissions(@Param('userId') userId: string){
        return this.permissionsService.removeUserPermissions(+userId)
    }
}
