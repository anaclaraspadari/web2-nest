/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancesModule } from './finances/finances.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProductsModule, FinancesModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
