import { User } from '../schemas.js'
import { prisma } from '../db.js'

export async function getUserById(userId: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}