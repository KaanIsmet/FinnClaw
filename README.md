# FinnClaw

FinnClaw is a real-time stock analytics application focused on delivering fast market data, visualizations, and lightweight analytics. The backend is built with Fastify and serves APIs for live quotes, historical price data, company profiles, CSV imports, watchlists, and computed indicators. The frontend will be a React + Vite single-page app providing interactive price and volume charts, watchlist management, and auto-refreshing live data.

Key features
- Live quotes: low-latency current prices pushed via Redis pub/sub / websockets.
- Historical OHLCV: cached candle storage with endpoints for charting.
- Price & volume charts: interactive candlestick and volume visualizations.
- Company profile: fundamentals and metadata per symbol.
- Watchlists: create and manage multiple symbol lists.
- CSV import: upload trade or holdings CSVs and reconcile/import rows.
- Auto-refresh & alerts: configurable auto-refresh and simple alert rules.
- Basic indicators: SMA/EMA/RSI/MACD endpoints for on-demand calculation.

Architecture (overview)
- Backend: Fastify (TypeScript) — API, data ingestion, background jobs.
- Frontend: React + Vite — SPA, charting UI, websockets for live updates.
- Database: PostgreSQL (recommend TimescaleDB for time-series) for prices/metadata.
- Cache/Realtime: Redis for latest-quote cache and pub/sub.
- External: Finnhub API for market data and company metadata.

**Authentication Service**
We have integrated Clerk as our authentication service to handle user registration, login, and session management. This ensures a secure and streamlined user experience across the application.

**Payments Processing**
Stripe is used for handling payments within the application. This allows users to manage their subscriptions or make one-time purchases seamlessly.

**Hosting**
Railway is our hosting platform of choice. It simplifies deployment and scaling, allowing FinnClaw to run smoothly with minimal setup.

Environment & local dev (summary)
- Required env vars: API_KEY (Finnhub), DATABASE_URL, REDIS_URL, NODE_ENV
- Backend (example): cd backend && npm install && npm run dev
- Frontend (example): cd frontend && npm install && npm run dev