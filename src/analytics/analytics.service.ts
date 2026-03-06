import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from '../database/entities/sale.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Sale)
    private saleRepo: Repository<Sale>,
  ) {}

  async revenueByRegion() {
    return this.saleRepo
      .createQueryBuilder('sale')
      .leftJoin('sale.customer', 'customer')
      .select('customer.region', 'region')
      .addSelect('SUM(sale.totalAmount)', 'revenue')
      .groupBy('customer.region')
      .orderBy('revenue', 'DESC')
      .getRawMany();
  }

  async monthlyRevenue() {
    return this.saleRepo
      .createQueryBuilder('sale')
      .select("DATE_TRUNC('month', sale.saleDate)", 'month')
      .addSelect('SUM(sale.totalAmount)', 'revenue')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }

  async topCustomers() {
    return this.saleRepo
      .createQueryBuilder('sale')
      .leftJoin('sale.customer', 'customer')
      .select('customer.name', 'customer')
      .addSelect('SUM(sale.totalAmount)', 'revenue')
      .groupBy('customer.name')
      .orderBy('revenue', 'DESC')
      .limit(5)
      .getRawMany();
  }
  async runSQL(sql: string) {
    return this.saleRepo.query(sql);
  }
}