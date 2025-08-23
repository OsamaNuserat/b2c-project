# Frontend - Admin Dashboard

A Next.js admin dashboard for managing products and orders, built with TypeScript, Material-UI, and React Query.

## Features

- **Product Management**: Add, view, edit, and delete products
- **Order Management**: Create, view, edit, and delete orders with product details
- **Modern UI**: Built with Material-UI components
- **Form Validation**: React Hook Form with Zod validation
- **Type Safety**: Full TypeScript support
- **API Integration**: React Query for efficient data fetching

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Material-UI** for UI components
- **React Query** for data fetching and caching
- **React Hook Form** for form management
- **Zod** for schema validation
- **Axios** for HTTP requests

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend services running (Product Service on port 3001, Order Service on port 3002)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
```bash
# Create .env.local file
NEXT_PUBLIC_ORDER_API=http://localhost:3002
NEXT_PUBLIC_PRODUCT_API=http://localhost:3001
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (proxy to backend)
│   ├── products/          # Products page
│   ├── orders/            # Orders page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── forms/            # Form components
│   └── ui/               # UI components
├── hooks/                # Custom React Query hooks
├── lib/                  # Utilities and configurations
│   ├── api/              # API client and config
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Utility functions
└── styles/               # Global styles
```

## API Integration

The frontend communicates with backend services through Next.js API routes:

- `/api/products/*` → Product Service (port 3001)
- `/api/orders/*` → Order Service (port 3002)

## Key Components

### Forms
- `ProductForm`: Add/edit product with image URL support
- `OrderForm`: Create/edit orders with product selection

### Lists
- `ProductList`: Display products in a table with actions
- `OrderList`: Display orders with product details

### Hooks
- `useProducts`: Product CRUD operations
- `useOrders`: Order CRUD operations

## Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- No `any` types or direct refs (as per requirements)

### Best Practices
- React Hook Form for all form management
- Zod schemas for validation
- Controlled components only
- Proper error handling
- Loading states
- Type-safe API calls

## Docker

The frontend can be run with Docker:

```bash
# Build and run with docker-compose
docker-compose up --build

# Or build individually
docker build -t frontend .
docker run -p 3000:3000 frontend
```

## Environment Variables

- `NEXT_PUBLIC_ORDER_API`: Order service URL (default: http://localhost:3002)
- `NEXT_PUBLIC_PRODUCT_API`: Product service URL (default: http://localhost:3001)
