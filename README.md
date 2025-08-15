# Full Stack Developer Assignment

This repo contains:
- Product Service (NestJS + TypeORM + SQLite)
- Order Service (NestJS + TypeORM + SQLite)
- Next.js Admin UI
- Docker Compose

## Services

- Product Service
  - Port: 3001
  - Swagger: http://localhost:3001/api
- Order Service
  - Port: 3002
  - Swagger: http://localhost:3002/api
- Frontend
  - Port: 3000

## Running Locally (Docker)

- docker compose up --build

## Running Locally (without Docker)

- Install deps for each service and run dev
  - cd backend/product-service && npm install && npm run start:dev
  - cd backend/order-service && npm install && npm run start:dev
  - cd frontend && npm install && npm run dev

Order service uses PRODUCT_SERVICE_URL env var (defaults to http://localhost:3001). Frontend uses NEXT_PUBLIC_* vars for APIs.
