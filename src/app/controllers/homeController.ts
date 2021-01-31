import { Request, Response } from "express";

const homeController = {
    async get (_req: Request, res: Response) {
        try {
            res.render('index');            
        } catch(e) {
            console.warn(e);
        }
    },
};

export default homeController;
