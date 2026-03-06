# AI Analytics Engine

An AI-powered analytics backend built with **NestJS, PostgreSQL, and local LLMs (Ollama)** that converts natural language questions into SQL queries and executes them against a relational dataset.

---

## 🚀 Features

• Natural language → SQL query generation
• Local LLM integration using **Llama3 via Ollama**
• SQL safety validation layer
• PostgreSQL analytics dataset
• REST API for analytics queries
• Automatic SQL correction for camelCase columns
• Dockerized PostgreSQL database

---

## 🏗 Architecture

```
User Question
      |
      v
POST /analytics/query
      |
      v
NestJS Backend
      |
      v
AI Service (Ollama / Llama3)
      |
      v
Natural Language → SQL
      |
      v
SQL Safety Validator
      |
      v
PostgreSQL Query Execution
      |
      v
Analytics Result Returned
```

This pipeline converts natural language questions into SQL queries using a local LLM and executes them safely against a PostgreSQL analytics dataset.

---

## 🛠 Tech Stack

Backend

* NestJS
* TypeScript
* TypeORM

Database

* PostgreSQL
* Docker

AI Layer

* Ollama
* Llama3

Other

* Faker (data generation)

---

## 📊 Example Query

Request:

POST /analytics/query

```json
{
  "question": "Show revenue by region"
}
```

Response:

```json
{
  "generatedSQL": "SELECT c.region, SUM(s.\"totalAmount\") AS revenue FROM sales s JOIN customers c ON s.customer_id = c.id GROUP BY c.region;",
  "result": [
    { "region": "India", "revenue": 34567 },
    { "region": "Germany", "revenue": 29811 }
  ]
}
```

---

## ⚡ Running the Project

Install dependencies

```
npm install
```

Start PostgreSQL

```
docker compose up -d
```

Run backend

```
npm run start:dev
```

Seed database

```
npm run seed
```

---

## 🤖 AI Query Endpoint

```
POST /analytics/query
```

Example:

```json
{
  "question": "Top 5 customers by revenue"
}
```

---

## 🔒 Safety Guardrails

• Only SELECT queries allowed
• Dangerous SQL operations blocked
• SQL validation layer before execution

---

## Demo

Example query using the AI analytics engine.

### Request

POST `/analytics/query`

```json
{
  "question": "Show revenue by region"
}
```

### Generated SQL

```sql
SELECT c.region, SUM(s."totalAmount") AS revenue
FROM sales s
JOIN customers c ON s.customer_id = c.id
GROUP BY c.region;
```

### Response

```json
{
  "question": "Show revenue by region",
  "generatedSQL": "SELECT c.region, SUM(s.\"totalAmount\") AS revenue FROM sales s JOIN customers c ON s.customer_id = c.id GROUP BY c.region;",
  "result": [
    { "region": "India", "revenue": 34567 },
    { "region": "Germany", "revenue": 29811 },
    { "region": "United States", "revenue": 27112 }
  ]
}
```

This demonstrates how the system converts natural language questions into SQL queries using a local LLM and returns analytics results from PostgreSQL.


## 📌 Future Improvements

* Query caching with Redis
* Frontend dashboard (React)
* Schema auto-discovery
* Query history logging

---
