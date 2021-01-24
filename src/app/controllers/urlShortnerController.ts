import { Request, Response } from 'express';

const data: Record<string, string | undefined> = {};

const urlShortnetController = {
    async create (req: Request, res: Response) {
        const { url, name } = req.body;

        data[name] = url;
    
        res.sendStatus(200);
    },

    async get (req: Request, res: Response) {
        const { name } = req.params;

        const url = data[name];

        if (url) {
            res.redirect(url);
        } else {
            res.sendStatus(404);
        }
    },
};

export default urlShortnetController;
