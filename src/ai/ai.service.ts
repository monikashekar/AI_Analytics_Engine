import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class AiService {
  
  async generateSQL(question: string) {

    const prompt = `
    You are a PostgreSQL expert.
    
    Convert the question into a SQL query.
    
    Database schema:
    
    customers
    - id
    - name
    - region
    - industry
    
    products
    - id
    - name
    - category
    - price
    
    sales_reps
    - id
    - name
    - region
    - hireDate
    
    sales
    - id
    - customer_id
    - sales_rep_id
    - product_id
    - quantity
    - totalAmount
    - saleDate
    
    Relationships:
    
    sales.customer_id → customers.id
    sales.product_id → products.id
    sales.sales_rep_id → sales_reps.id
    
    Rules:
    - Return ONLY SQL
    - No explanation
    - No markdown
    - Use correct JOINs
    - Use PostgreSQL syntax
    - Always quote camelCase columns
    
    Example:
    
    Question: Show revenue by region
    
    SQL:
    SELECT c.region, SUM(s."totalAmount") AS revenue
    FROM sales s
    JOIN customers c ON s.customer_id = c.id
    GROUP BY c.region;
    
    Now convert this question:
    
    ${question}
    
    SQL:
    `;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false
      }
    );

    let sql = response.data.response;

    sql = sql.replace(/```sql/g, "").replace(/```/g, "");

    return sql.trim();
  }
}