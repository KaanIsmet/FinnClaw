import axios from 'axios'
import { prisma } from "../db.js";
import { User } from '../schemas.js'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

async function registerUser(user: Omit<User, 'id'>): Promise<User> {
    return await prisma.user.create({
        data: {
            id: crypto.randomUUID(),
            username: user.username,
            email: user.email,
            passwordHash: user.passwordHash,
            emailVerified: user.emailVerified,
            role: user.role
        }
    });
    console.log('User registered successfully:', user);
}

export async function registerUserRoute(app: FastifyInstance): Promise<void> {
    app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const userData = request.body as Omit<User, 'id'>;
            const newUser = await registerUser(userData);
            return reply.status(201).send(newUser);
        } catch (error: any) {
            return reply.status(500).send({ error: error.message });
        }
    });
}

export async function getUserByIdRoute(app: FastifyInstance): Promise<void> {
    app.get('/users/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const userId = request.params.id;
            const user = await prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                return reply.status(404).send({ error: 'User not found' });
            }
            return reply.send(user);
        } catch (error: any) {
            return reply.status(500).send({ error: error.message });
        }
    });
}

export async function getAllUsersRoute(app: FastifyInstance): Promise<void> {
    app.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await prisma.user.findMany();
            return reply.send(users);
        } catch (error: any) {
            return reply.status(500).send({ error: error.message });
        }
    });
}