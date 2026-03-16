import { StockQuote, StockProfile } from "../schemas.js";
import axios from 'axios';
import 'dotenv/config';

export async function getStockQuote(symbol: string): Promise<StockQuote>  {
    const apiKey = process.env.API_KEY
    if (!apiKey) 
        throw new Error('API key is not set');
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
        const data = response.data

        if (data.c === 0)
            throw new Error(`Symbol ${symbol} doesn't exist`);
        const stockQuote: StockQuote = {
            ticker: symbol,
            currentPrice: data.c,
            change: data.d,
            percentChange: data.dp,
            high: data.h,
            low: data.l,
            open: data.o,
            previousClose: data.pc,
            lastUpdated: new Date(data.t * 1000)
        }
        return stockQuote;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch stock quote: ${error.response?.data.message || error.message}`)
        }
        throw new Error(`An unexpected error occurred`)
    }
}

export async function getStockProfile(symbol: string) {
    const apiKey = process.env.API_KEY
    if (!apiKey) 
        throw new Error('API key is not set');
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`)
        const data = response.data
        const formattedIpo = new Date(data.ipo).toISOString();
        if (data.country === '')
            throw new Error(`Symbol ${symbol} doesn't exist`);
        const stockProfile: StockProfile = {
            country: data.country,
            currency: data.currency,
            estimateCurrency: data.estimateCurrency,
            exchange: data.exchange,
            finnhubIndustry: data.finnhubIndustry,
            ipo: formattedIpo,
            logo: data.logo,
            marketCapitalization: data.marketCapitalization,
            name: data.name,
            phone: data.phone,
            shareOutstanding: data.shareOutstanding,
            ticker: data.ticker,
            weburl: data.weburl,
        }
        return stockProfile;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Failed to fetch stock profile: ${error.response?.data.message || error.message}`)
        }
        throw new Error(`An unexpected error occurred`)
    }
}