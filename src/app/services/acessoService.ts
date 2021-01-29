import { PrismaClient, Acesso, Url } from '@prisma/client';
import { totalmem } from 'os';

const prisma = new PrismaClient();

class AcessoService {
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
        return prisma.acesso.groupBy({    
            by: [
                "TO_CHAR(acess_date :: DATE), 'dd/mm/yyyy'",
            ],
            where: {
                name_url: name,
            },
            sum: {
                total: true,
            },
        })
    }
}

export default new AcessoService();
