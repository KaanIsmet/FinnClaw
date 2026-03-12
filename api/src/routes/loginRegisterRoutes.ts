import axios from 'axios'
import { prisma } from "../db.js";
import { User } from '../schemas.js'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { getUserById } from '../services/userService.js';

async function registerUser(user: Omit<User, 'id'>): Promise<User> {
    if (!user.username || !user.email || !user.passwordHash) {
        throw new Error('Missing required user fields');
    }
    console.log('User registering...', user);
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
            const user = getUserById(userId);
            if (!user || user == null) {
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

export async function loginUserRoute(app: FastifyInstance): Promise<void> {
    app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { email, password } = request.body as { email: string; password: string };
            if (!email || !password) {
                return reply.status(400).send({ error: 'Email and password are required' });
            }
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (!user || user.passwordHash !== password) {
                return reply.status(401).send({ error: 'Invalid email or password' });
            }
            // In a real application, you would generate a JWT or session here
            return reply.send({ message: 'Login successful', user });
        } catch (error: any) {
            return reply.status(500).send({ error: error.message });
        }
    });
}