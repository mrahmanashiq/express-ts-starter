import { Request, Response } from 'express';

export const test = async (req: Request, res: Response) => {
    try {
        console.log(req.user);

        return res.status(200).json({message: 'success'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error'})
    }
}