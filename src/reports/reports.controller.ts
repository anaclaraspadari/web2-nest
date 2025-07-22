/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Departments } from 'src/decorator/department.decorator';
import { Profiles } from 'src/decorator/profile.decorator';
import { DepartmentGuard } from 'src/department/department.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Report')
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Report')
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Report')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Report')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Report')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
