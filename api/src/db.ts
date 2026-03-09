import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config({ path: process.env.PRISMA_DOTENV_PATH || '.env' })

export const prisma = new PrismaClient()

export function usePrismaShutdown(app: import('fastify').FastifyInstance) {
  app.addHook('onClose', async () => {
    await prisma.$disconnect()
  })
}