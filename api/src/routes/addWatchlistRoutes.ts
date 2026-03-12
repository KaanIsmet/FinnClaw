import { User } from '../schemas.js'
import { prisma } from '../db.js'
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { getUserById } from '../services/userService.js'

export async function addWatchlistRoute(app: FastifyInstance) {
    app.put('/watchlists/:id', 
        async (request: FastifyRequest<{ Params: { id: string }, Querystring: { symbol: string} }>, reply: FastifyReply) => {
        const userId = request.params.id;
        const symbol = request.query;
        let user = prisma.user.findUnique({
            where: {id: userId}
        });

        let watchlists = user.watchlists;
        
    });
}