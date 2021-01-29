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

    // async getMetrics(name: string) {
    //     return prisma.acesso.aggregate({    
    //         by: [
    //             "EXTRACT(YEAR FROM TIMESTAMP acess_date)",
    //             "EXTRACT(MONTH FROM TIMESTAMP acess_date)",
    //             "EXTRACT(DAY FROM TIMESTAMP acess_date)"
    //         ],
    //         sum: {
    //             total: true,
    //         },
    //         where: {
    //             name_url: name,
    //         },
    //     })
    // }
}

export default new AcessoService();
