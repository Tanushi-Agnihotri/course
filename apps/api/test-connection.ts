import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client';

async function main() {
    console.log('Testing database connection...');
    const uri = process.env.MONGO_URI;
    console.log('MONGO_URI:', uri ? 'Defined' : 'Undefined');
    console.log('Testing with directConnection=true...');
    process.env.MONGO_URI = uri + "&directConnection=true";

    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database!');

        // Try a simple query
        const count = await prisma.users.count();
        console.log(`User count: ${count}`);

    } catch (e) {
        console.error('Failed to connect to the database:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
