import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from 'src/ai/ai.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { validateSQL } from 'src/analytics/sql-validator';

@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService, 
        private readonly analyticsService: AnalyticsService) {}

@Post('query')
async query(@Body('question') question: string) {

  const sql = await this.aiService.generateSQL(question);

  validateSQL(sql);

  try {

    const result = await this.analyticsService.runSQL(sql);

    return {
      question,
      generatedSQL: sql,
      result
    };

  } catch (error) {

    return {
      question,
      generatedSQL: sql,
      error: "Query failed — model generated incorrect SQL",
      details: error.message
    };

  }
}
}
