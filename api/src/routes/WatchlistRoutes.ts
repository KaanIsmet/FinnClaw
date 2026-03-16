import { Prisma } from '@prisma/client';
import { prisma } from '../db.js'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { getStockProfile } from '../services/financeService.js'

export const watchlistRoutes = [addWatchlistItemRoute, addWatchlistRoute, getWatchlistsRoute];

export async function addWatchlistRoute(app: FastifyInstance): Promise<void> {
    app.post('/watchlists/:id',
        async (request: FastifyRequest<{ Params: { id: string }, Querystring: { name: string }}>, reply: FastifyReply) => {
            try {
                const userId = request.params.id;
                const watchlistname = request.query.name;
                const watchlist = await prisma.watchlist.create({
                    data: {
                        name: watchlistname,
                        userId,
                    }
                });

                return reply.status(201).send(watchlist)
            } catch (error) {
                return reply.status(500).send({error: 'Failed to create watchlist'});
            }
        }
    )
}
export async function addWatchlistItemRoute(app: FastifyInstance): Promise<void> {
    app.post('/watchlistsitem/:id',
            async (request: FastifyRequest<{ Params: { id: string }, Querystring: { symbol: string, watchlistname: string } }>, reply: FastifyReply) => {
                try {
                    const userId = request.params.id;
                    const symbol = request.query.symbol;
                    const watchlistname = request.query.watchlistname;
                    const stockProfile = await getStockProfile(symbol);

                    if (!stockProfile) {
                        throw new Error('Failed to fetch stock profile');
                    }
        

                    console.log('Upserting stock into database:', stockProfile);
                    const stock = await prisma.stock.upsert({
                        where: { ticker: stockProfile.ticker },
                        update: {},
                        create: stockProfile,
                    });

                    const watchlist = await prisma.watchlist.findFirst({
                        where: {
                            userId,
                            name: watchlistname
                        }
                    });

                    if (!watchlist) {
                        return reply.status(404).send({ error: 'No watchlist found for this user' });
                    }
        

                    console.log('Creating watchlist item for user:', userId, 'and stock:', stock.id);
                    const watchlistItem = await prisma.watchlistItem.create({
                        data: {
                            watchlistId: watchlist.id,
                            stockId: stock.id
                        }
                    })
        
        
                    return reply.send(watchlistItem);
                } catch (error) {
                    console.error('Error adding stock to watchlist:', error); // Log the error with details
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        console.log('Prisma Client Known Request Error:', error.meta);
                    }
                    reply.status(500).send({ error: 'Failed to add stock to watchlist' });
                }
                });
}

export async function getWatchlistsRoute(app: FastifyInstance): Promise<void> {
    app.get('/watchlists/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const userId = request.params.id;
        const watchlists = await prisma.watchlist.findMany({
            where: { userId }
        });

        return reply.send(watchlists);
    });
}