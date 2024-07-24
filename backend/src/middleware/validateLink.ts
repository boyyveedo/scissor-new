import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

const validateLink = (linkSchema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await linkSchema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        }, { abortEarly: false });
        next();
    } catch (e) {
        return res.status(400).send(e);
    }
}

export default validateLink;
