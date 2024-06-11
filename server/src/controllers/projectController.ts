import { Request, Response } from 'express';
import { Project } from '../models/project';
import { BadRequestError } from '../errors/badRequest';


export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find({
            $or: [
                { createdBy: req.user?.id },
                { users: req.user?.id }
            ]
        }).sort({_id:-1});

        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createNewProject = async (req: Request, res: Response) => {
    try {
        let data = {
            ...req.body,
            createdBy: req.user?.id
        }
        const project = new Project(data);
        await project.save();
        res.status(201).json(project);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
}

export const addMembersToGroup = async (req: Request, res: Response) => {
    try {
        let project = await Project.findById(req.body.projectId);

        if (!project) {
            throw new BadRequestError('Project not found!');
        }

        project.users = req.body.users;

        await project.save();
        
        res.status(201).json('Users addes successfully');
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
} 


export const getProjectMembers = async (req: Request, res: Response) => {
    try {
       
        let project = await Project.findById(req.params.id).select('users');

        if (!project) {
            throw new BadRequestError('Project not found!');
        }

        res.status(200).json(project);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
} 