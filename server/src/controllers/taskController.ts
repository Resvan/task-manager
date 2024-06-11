import { Request, Response } from 'express';
import Task from '../models/task';
import mongoose from 'mongoose';


export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.aggregate([
            {
                $sort: { "_id": -1 }
            },
            {
                $group: {
                    _id: "$state", 
                    items: {
                        $push: "$$ROOT"
                    }
                }
            },
        ]);

        res.status(200).json(tasks);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
};

export const getTaskByProject = async (req: Request, res: Response) => {
    let projectId = req.params.id;
    try {
        const tasks = await Task.aggregate([
            {
                $match: { projectId: new mongoose.Types.ObjectId(projectId) } 
            },
            {
                $sort: { "_id": -1 }
            },
            {
                $group: {
                    _id: "$state",
                    items: {
                        $push: "$$ROOT"
                    }
                }
            },
        ]);

        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

