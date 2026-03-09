import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { getStockQuote, getStockProfile } from "../services/financeService.js";
import multipart, { MultipartFile } from '@fastify/multipart'

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

export async function importCSVRoute(app: FastifyInstance) {
  // ensure the multipart plugin is registered for this app instance
  await app.register(multipart)

  app.post('/importCSV', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // `request.file` exists when the @fastify/multipart plugin is registered.
      const fileFn = (request as any).file as (() => Promise<MultipartFile>) | undefined
      const data = fileFn ? await fileFn() : undefined
      if (!data) {
        return reply.status(400).send({ error: "Unable to read file (multipart not enabled or no file)" })
      }

      // Process the CSV file here (stream or buffer)
      return reply.send({ message: "File uploaded successfully" })

    } catch (error: any) {
      reply.status(500).send({ error: error.message })
    }
  })
}