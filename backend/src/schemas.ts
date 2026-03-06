import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

export const HealthBar = Type.Object({
    status: Type.String()
});

export const StockInfo = Type.Object({
    symbol: Type.String(),
    name: Type.String(),
    industry: Type.String(),
    sector: Type.String(),
    currentPrice: Type.Number(),
    market_cap: Type.Number(),
    currency: Type.String()
})

export const PriceData = Type.Object({
    date: Type.Date(),
    open: Type.Number(),
    close: Type.Number(),
    high: Type.Number(),
    low: Type.Number(),
    volume: Type.Number()
})

export const stockHistory = Type.Object({
    symbol: Type.String(),
    period: Type.String(),
    prices: Type.Array(PriceData)
})

export const stockStats = Type.Object({
    symbol: Type.String(),
    period: Type.String(),
    averagePrices: Type.Number(),
    high: Type.Number(),
    low: Type.Number(),
    volatility: Type.Number()
})