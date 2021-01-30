import { PrismaClient, Acesso, Url } from '@prisma/client';

const prisma = new PrismaClient();

class AcessService {
    async getByUrl (url: Url) {
        return prisma.acesso.findFirst({
            where: { name_url: url.name },
        });
    }

    async create (url: Url) {
        const acesso: Acesso | null = await this.getByUrl(url);

        if (!acesso) {
            return prisma.acesso.create({
                data: {
                    total: 1,
                    name_url: url.name,
                },
            });
        }

        return prisma.acesso.create({
            data: {
                total: acesso.total + 1,
                name_url: url.name,
            },
        });
    }

    async getMetricsByUrl(name: string) {
        return prisma.$queryRaw`
            SELECT TO_CHAR(acess_date, 'dd/mm/yyyy') AS date, SUM(total) AS total
            FROM "url_shortner"."Acesso" 
            WHERE name_url = ${name}
            GROUP BY TO_CHAR(acess_date, 'dd/mm/yyyy')
        `;
    }
}

export default new AcessService();
