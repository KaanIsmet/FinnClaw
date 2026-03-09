export interface StockQuote {
  ticker: string,
  currentPrice: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  lastUpdated: Date;
}

export interface StockProfile {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

export interface CompanyNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface NewsArticle { 
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface Recommendation {
  period: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
}

export interface PriceTarget {
  lastUpdate: number;
  symbol: string;
  targetHighPrice: number;
  targetLowPrice: number;
  targetMeanPrice: number;
  targetMedianPrice: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  role: string;
  createdAt: Date;
}