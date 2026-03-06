import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { AnalyticsService } from './analytics.service';
import { validateSQL } from './sql-validator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService,
    private readonly aiService: AiService) {}

  @Get('revenue-by-region')
  revenueByRegion() {
    return this.analyticsService.revenueByRegion();
  }

  @Get('monthly-revenue')
  monthlyRevenue() {
    return this.analyticsService.monthlyRevenue();
  }

  @Get('top-customers')
  topCustomers() {
    return this.analyticsService.topCustomers();
  }

  @Post('query')
  async query(@Body('question') question: string) {
  
    const sql = await this.aiService.generateSQL(question);
  
    validateSQL(sql);
  
    const result = await this.analyticsService.runSQL(sql);
  
    return {
      question,
      generatedSQL: sql,
      result
    };
  }
}