import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '../entities/customer.entity';
import { SalesRep } from '../entities/sales-rep.entity';
import { Product } from '../entities/product.entity';
import { Sale } from '../entities/sale.entity';

import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, SalesRep, Product, Sale]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}