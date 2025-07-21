/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileGuard } from 'src/auth/profile.guard';
import { Profiles } from 'src/decorator/profile.decorator';
import { DepartmentGuard } from 'src/department/department.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
