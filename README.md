# CryptoMetrics API

A robust cryptocurrency tracking API that provides real-time price statistics and price deviation analysis for Bitcoin, Ethereum, and MATIC. Built with TypeScript, Express.js, and MongoDB.

[![Deployment Status](https://img.shields.io/badge/deployment-live-success)](https://crypto-metrics-teal.vercel.app)

```mermaid
flowchart TD
    subgraph External
        CG[CoinGecko API]
    end

    subgraph Backend
        BJ[Background Job
         Every 2 hours]
        API[Express API Server]
        DB[(MongoDB)]
        
        subgraph Endpoints
            Stats["/api/stats
Latest Crypto Data"]
            Dev["/api/deviation
Price Standard Deviation"]
        end
    end

    CG -->|Fetch Price Data\nBTC, ETH, MATIC| BJ
    BJ -->|Store Price Records| DB
    API --> Stats & Dev
    Stats -->|Query Latest Data| DB
    Dev -->|Query Last 100 Records| DB

    classDef external fill:#ff9800,stroke:#000,stroke-width:2px,color:#000
    classDef api fill:#2196f3,stroke:#000,stroke-width:2px,color:#fff
    classDef db fill:#4caf50,stroke:#000,stroke-width:2px,color:#fff
    
    class CG external
    class API,Stats,Dev api
    class DB db

```
## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Try It Now](#try-it-now)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Rate Limiting](#rate-limiting)
- [Data Models](#data-models)
- [Error Handling](#error-handling)

## Features

- Real-time cryptocurrency price tracking
- Price statistics including market cap and 24-hour change
- Standard deviation calculation for price volatility analysis
- Automatic price updates using background jobs
- Rate limiting for API protection
- Support for multiple cryptocurrencies (Bitcoin, Ethereum, MATIC)
- Type-safe implementation using TypeScript

## Tech Stack

- **Backend Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel
- **Additional Tools**:
  - CORS for cross-origin resource sharing
  - Express Rate Limiter for API protection
  - Dotenv for environment variable management

## API Endpoints

### GET /api/stats
Fetches latest price statistics for a specified cryptocurrency.

Query Parameters:
- `coin`: (Required) One of "bitcoin", "ethereum", or "matic-network"

Response:
```json
{
  "price": number,
  "marketCap": number,
  "24change": number
}
```

### GET /api/deviation
Calculates price standard deviation based on the last 100 price records.

Query Parameters:
- `coin`: (Required) One of "bitcoin", "ethereum", or "matic-network"

Response:
```json
{
  "deviation": number
}
```

## Try It Now

Test the API endpoints directly using these curl commands:

### Get Bitcoin Stats
```bash
curl "https://crypto-metrics-teal.vercel.app/api/stats?coin=bitcoin"
```

### Get Ethereum Stats
```bash
curl "https://crypto-metrics-teal.vercel.app/api/stats?coin=ethereum"
```

### Get MATIC Stats
```bash
curl "https://crypto-metrics-teal.vercel.app/api/stats?coin=matic-network"
```

### Get Bitcoin Price Deviation
```bash
curl "https://crypto-metrics-teal.vercel.app/api/deviation?coin=bitcoin"
```

### Get Ethereum Price Deviation
```bash
curl "https://crypto-metrics-teal.vercel.app/api/deviation?coin=ethereum"
```

### Get MATIC Price Deviation
```bash
curl "https://crypto-metrics-teal.vercel.app/api/deviation?coin=matic-network"
```

You can also test these endpoints using tools like Postman or any web browser.


## Installation

1. Clone the repository:
```bash
git clone https://github.com/vishdadhich092004/CryptoMetrics
cd crypto-metrics
cd server
```

2. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=6060
MONGO_URI=your_mongodb_connection_string
COIN_GECKO_URL = https://api.coingecko.com/api/v3
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Rate Limiting

The API implements rate limiting with the following configuration:
- Window: 15 minutes
- Maximum requests per window: 100 requests
- Applies to all API routes under `/api`

## Data Models

### CryptoPrice Schema

```typescript
{
  coinId: string (enum: ["bitcoin", "matic-network", "ethereum"]),
  price: number,
  marketCap: number,
  dayChange: number,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API implements consistent error handling with the following status codes:

- `400`: Invalid request parameters
- `404`: Resource not found
- `500`: Internal server error

Each error response follows the format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Live Demo

The API is deployed and accessible at: [https://crypto-metrics-teal.vercel.app](https://crypto-metrics-teal.vercel.app)

