import { Request, Response } from 'express';

const urlShortnetController = {
    async create (req: Request, res: Response) {
        res.json({
            message: 'Hello World!',
        });
    },

    async get (req: Request, res: Response) {
        res.json({
            message: 'Hello World!',
        });
    },
};

export default urlShortnetController;
