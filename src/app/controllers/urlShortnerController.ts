import { Request, Response } from 'express';
import {ParamsDictionary} from 'express-serve-static-core'

const data: any = {};

type RequestBody = {
    url: string,
    name: string,
}

const urlShortnetController = {
    async create (req: Request, res: Response) {
        const body: RequestBody = req.body;

        data[body.name] = body.url;
        
        console.warn('data: ', data);

        res.sendStatus(200);
    },

    async get (req: Request, res: Response) {
        res.json({
            message: 'Hello World!',
        });
    },
};

export default urlShortnetController;
