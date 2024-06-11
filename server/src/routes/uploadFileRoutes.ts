import { Router } from "express";
import upload from "../config/multer";
import { uploadFile } from "../controllers/uploadFileController";


const router = Router();

router.post('/upload-file', upload.single('file'), uploadFile);



export default router;