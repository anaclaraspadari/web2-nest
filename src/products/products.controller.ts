/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
//import { ProfileGuard } from 'src/auth/profile.guard';
import { Profiles } from 'src/decorator/profile.decorator';
import { DepartmentGuard } from 'src/guards/department.guard';
import { Departments } from 'src/decorator/department.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Módulo de gestão de produtos
  //esse modulo pode ser acessado por todos que tiverem acesso
  @Post()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Product')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  // @UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Product')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  //@UseGuards(ProfileGuard)
  @UseGuards(DepartmentGuard)
  @Departments('Product')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Profiles('SUPERUSER','ADMIN')
  @UseGuards(DepartmentGuard)
  @Departments('Product')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
