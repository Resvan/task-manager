import { Request, Response } from 'express';
import { User } from '../models/user';


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ _id: { $ne: req.user?.id } });
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};