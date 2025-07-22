/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { AuthGuard } from 'src/guards/auth.guard';
// import { ProfileGuard } from 'src/auth/profile.guard';
// import { Profiles } from 'src/decorator/profile.decorator';
import { DepartmentGuard } from '../guards/department.guard';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  // @Profiles('SUPERUSER','ADMIN')
  // @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @UseGuards(AuthGuard)
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  // @Profiles('SUPERUSER','ADMIN')
  // @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  // @Profiles('SUPERUSER','ADMIN')
  // @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Delete(':id')
  // @Profiles('SUPERUSER','ADMIN')
  // @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
