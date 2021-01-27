import { Request, Response } from 'express';

interface DataType {
    url: string;
    expirationDate?: Date;
}

const data: Record<string, DataType | undefined> = {};

const urlShortnetController = {
    async create (req: Request, res: Response) {
        const {
            url,
            name,
            expiration_date: expirationDate,
        } = req.body;

        if (data[name]) {
            return res.status(422).json({
                message: "Name to abbreviate url already exists",
            });
        }

        const expirationDateDefault = new Date();
        const newYear = expirationDateDefault.getFullYear() + 1;
        expirationDateDefault.setFullYear(newYear);

        data[name] = {
            url,
            expirationDate: expirationDate || expirationDateDefault,
        };
    
        res.sendStatus(200);
    },

    async get (req: Request, res: Response) {
        const { name } = req.params;

        const url = data[name]?.url;

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
