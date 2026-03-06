import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

import { Sale } from '../database/entities/sale.entity';
import { Customer } from '../database/entities/customer.entity';
import { Product } from '../database/entities/product.entity';
import { SalesRep } from '../database/entities/sales-rep.entity';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Customer, Product, SalesRep]),
    AiModule
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}