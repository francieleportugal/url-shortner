import { Request, Response } from 'express';
import moment from 'moment';
import { Url } from '@prisma/client';
import urlService from '../services/urlService';
import acessoService from '../services/acessoService';

const data: Record<string, Url | undefined> = {};

const urlShortnetController = {
    async create (req: Request, res: Response) {
        const urlExists: Url | null = await urlService.getByName(req.body.name);

        if (urlExists) {
            return res.status(422).json({
                message: "Name to abbreviate url already exists",
            });
        }

        await urlService.create(req.body);
    
        res.sendStatus(200);
    },

    async get (req: Request, res: Response) {
        const { name } = req.params;

        const url: Url | null = await urlService.getByName(name);

        if (!url) {
            return res.status(404).json({
                message: "The short name of the url does not exist",
            });
        }

        const urlExpired = moment(new Date()).isSameOrAfter(url.expiration_date);

        if (urlExpired) {
            return res.status(422).json({
                message: "URL expired",
            });
        }

        await acessoService.create(url);

        return res.redirect(url.url);
    },

    async getMetricsByUrl (req: Request, res: Response) {
        const { name } = req.params;

        const url: Url | null = await urlService.getByName(name);

        if (!url) {
            return res.status(404).json({
                message: "The short name of the url does not exist",
            });
        }
    
        const acessos = await acessoService.getMetricsByUrl(name);

        res.status(200).json({
            acessos,
        });
    },
};

export default urlShortnetController;
