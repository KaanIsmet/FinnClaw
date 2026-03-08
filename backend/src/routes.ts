import fastify, { FastifyRequest, FastifyReply, FastifyInstance} from "fastify";
import { getStockQuote, getStockProfile } from "./finnhubService";
const app = fastify({logger: true})

interface StockQuery {
  symbol: string;
}
export async function stockQuoteRoute(app: FastifyInstance) {
  app.get('/stockQuote', async (request: FastifyRequest<{ Querystring: StockQuery }>, reply: FastifyReply) => {
    try {
      const { symbol } = request.query;

      if (!symbol) {
        return reply.status(400).send({ error: "Missing or invalid symbol parameter" });
      }

      const stockQuote = await getStockQuote(symbol);
      return reply.send(stockQuote);

    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  });
}

export async function stockProfileRoute(app: FastifyInstance) {
  app.get('/stockProfile', async (request: FastifyRequest<{ Querystring: StockQuery }>, reply: FastifyReply) => {
    try {
      const { symbol } = request.query;

      if (!symbol) {
        return reply.status(400).send({ error: "Missing or invalid symbol parameter" });
      }

      const stockProfile = await getStockProfile(symbol);
      return reply.send(stockProfile);

    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  });
}