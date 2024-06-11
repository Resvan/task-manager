import express from 'express';
import 'express-async-errors';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from "dotenv";
import taskRoutes from './routes/taskRoutes';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import fileUploadRoutes from './routes/uploadFileRoutes';
import { handleSocketConnection } from './sockets/socketHandller';
import connectDB from './config/db';
import { NotFoundError } from './errors/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { authRoutes } from './routes/authRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST', ] 
    }
});

dotenv.config()
app.use(express.json());
app.use(cors());


connectDB();

app.use('/api/tasks', taskRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/user', userRoutes);
app.use('/api/file', fileUploadRoutes);
app.use('/api/auth', authRoutes);



io.on('connection', (socket) => {
    handleSocketConnection(socket, io);
});

app.get('*', () => {
    throw new NotFoundError();
});


app.use(errorHandler);

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
