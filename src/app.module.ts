/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancesModule } from './finances/finances.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { DepartmentModule } from './department/department.module';
import { ModuleModule } from './module/module.module';
import { PermissionsService } from './permissions/permissions.service';
import { PermissionsModule } from './permissions/permissions.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [UsersModule, ProductsModule, FinancesModule, AuthModule, CaslModule, ModuleModule, PermissionsModule, DepartmentModule, ],
  controllers: [AppController],
  providers: [AppService, PermissionsService],
})
export class AppModule {}
