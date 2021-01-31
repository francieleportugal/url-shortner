import { Request, Response } from "express";

const homeController = {
    async get (_req: Request, res: Response): Promise<Response | void> {
        return res.render('index');
    },
};

export default homeController;
