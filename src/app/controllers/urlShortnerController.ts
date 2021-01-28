import { Request, Response } from 'express';
import moment from 'moment';

interface DataType {
    url: string;
    expirationDate?: Date;
    acessos: number;
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
            acessos: 0,
        };
    
        res.sendStatus(200);
    },

    async get (req: Request, res: Response) {
        const { name } = req.params;

        const url = data[name]?.url;

        if (!url) {
            return res.status(404).json({
                message: "The short name of the url does not exist",
            });
        }

        const expirationDate = data[name]?.expirationDate;
        const urlExpired = moment(new Date()).isSameOrAfter(expirationDate);

        if (urlExpired) {
            return res.status(422).json({
                message: "URL expired",
            });
        }

        if (data[name]?.acessos != undefined) {
            data[name]!.acessos = data[name]!.acessos + 1;
        }

        return res.redirect(url);
    },

    async getMetrics (req: Request, res: Response) {
        const { name } = req.params;

        const url = data[name]?.url;
        const acessos = data[name]?.acessos;

        if (!url) {
            return res.status(404).json({
                message: "The short name of the url does not exist",
            });
        }
    
        res.status(200).json({
            acessos,
        });
    },
};

export default urlShortnetController;
