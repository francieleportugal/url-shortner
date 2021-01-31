import { CronJob } from 'cron';
import urlService from '../app/services/urlService';
import acessService from '../app/services/acessService';

interface DataType {
    name: string;
}

const job = new CronJob('0 0 0 * * *', async function () {
    const urls: DataType[] | [] = await urlService.getExpiredURLs();

    await Promise.all(urls.map(async (url: DataType) => {
        await acessService.deleteManyByUrl(url.name);
        await urlService.deleteUrl(url.name);
    }));
});

job.start();
