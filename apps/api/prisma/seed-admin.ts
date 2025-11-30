import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@example.com';
    const password = 'adminpassword';
    const name = 'Admin User';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.upsert({
        where: { email },
        update: {
            role: 'admin',
            password: hashedPassword,
        },
        create: {
            email,
            name,
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log(`Admin user created/updated: ${user.email} / ${password}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
