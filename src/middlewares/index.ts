import * as z from 'zod';
import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

const regexp = new RegExp('^([A-Z]|[a-z]|[0-9]){1,}$');

export const createValidate = async (req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> => {
    const schemaValidate =  z.object({
        url: z.string().url(),
        name: z.string().nonempty().regex(regexp),
        expiration_date: z.string()
            .nonempty()
            .refine((value) => {
                return moment(value, moment.ISO_8601, true).isValid();
            }, {
                message: "invalid date",
            }).optional(),
    });

    const result = schemaValidate.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Error in data validation",
            errors: result.error.errors,
        });
    }

    next();
};

export const getValidate = async (req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> => {
    const schemaValidate = z.object({
        name: z.string().nonempty().regex(regexp)
    });

    const result = schemaValidate.safeParse(req.params);

    if (!result.success) {
        return res.status(400).json({
            message: "Error in data validation",
            errors: result.error,
        });
    }

    next();
}
