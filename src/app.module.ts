import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './database/entities/customer.entity';
import { SalesRep } from './database/entities/sales-rep.entity';
import { Product } from './database/entities/product.entity';
import { Sale } from './database/entities/sale.entity';
import { SeedModule } from './database/seed/seed.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AiService } from './ai/ai.service';
import { AiController } from './ai/ai.controller';
import { AiModule } from './ai/ai.module';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { AnalyticsController } from 'src/analytics/analytics.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Customer, SalesRep, Product, Sale]),
    SeedModule,
    AnalyticsModule,
    AiModule
  ],
  providers: [AiService, AnalyticsService],
  controllers: [AiController, AnalyticsController],
})
export class AppModule {}