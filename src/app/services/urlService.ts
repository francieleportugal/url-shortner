import { PrismaClient, Url } from '@prisma/client';

const prisma = new PrismaClient();

class UrlService {
    async create (data: Url) {
        const expirationDateDefault = new Date();
        const newYear = expirationDateDefault.getFullYear() + 1;
        expirationDateDefault.setFullYear(newYear);

        return prisma.url.create({
            data: {
                name: data.name,
                url: data.url,
                expiration_date: data.expiration_date || expirationDateDefault,
            },
        });
    }

    async getByName (name: string) {
        return prisma.url.findFirst({
            where: { name },
        });
    }

    async getExpiredURLs () {
        return prisma.url.findMany({
            select: {
                name: true,
            },
            where: {
                expiration_date: {
                    lte: new Date(),
                },
            },
        });
    }

    async deleteUrl (name: string) {
        return prisma.url.delete({
            where: { name },
        });        
    }
}

export default new UrlService();
