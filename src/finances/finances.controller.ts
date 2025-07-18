/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileGuard } from 'src/auth/profile.guard';
import { Profiles } from 'src/decorator/profile.decorator';

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financesService.create(createFinanceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  findAll() {
    return this.financesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  findOne(@Param('id') id: string) {
    return this.financesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financesService.update(+id, updateFinanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  remove(@Param('id') id: string) {
    return this.financesService.remove(+id);
  }
}
