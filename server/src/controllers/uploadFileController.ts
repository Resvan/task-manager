import { Request, Response } from 'express';
import { extractPublicId } from 'cloudinary-build-url';
import cloudinary from '../config/cloudinary';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (req.body.removed) {
            const publicId = extractPublicId(req.body.removed);
            await cloudinary.uploader.destroy(publicId);
        }
        

        const { folder } = req.body;
        let url = '';
        if (req.file?.path) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder,
            });
            url = result.secure_url;
        } else if (req.body.file) {
            url = req.body.file;
        }


        
        res.status(200).json({ file_url: url });
    } catch (error) {
        
        res.status(500).json({ message: error });
    }
};
