import { Request, Response } from 'express';

const data: Record<string, string | undefined> = {};

const urlShortnetController = {
    async create (req: Request, res: Response) {
        const { url, name } = req.body;

        if (data[name]) {
            return res.status(422).json({
                message: "Name to abbreviate url already exists",
            });
        }

        data[name] = url;
    
        res.sendStatus(200);
    },

    async get (req: Request, res: Response) {
        const { name } = req.params;

        const url = data[name];

        if (url) {
            res.redirect(url);
        } else {
            return res.status(404).json({
                message: "The short name of the url does not exist",
            });
        }
    },
};

export default urlShortnetController;
