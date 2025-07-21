/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileGuard } from 'src/auth/profile.guard';
import { Profiles } from 'src/decorator/profile.decorator';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @UseGuards(ProfileGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(AuthGuard)
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @UseGuards(ProfileGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(AuthGuard)
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  @UseGuards(ProfileGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(ProfileGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
