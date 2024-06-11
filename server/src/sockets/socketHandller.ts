import { Server, Socket } from 'socket.io';
import {  TaskT } from '../types/task';
import { creatNewTask, deleteTask, updateTaskData, updateTaskState } from '../helpers/taskHelpers';

export const handleSocketConnection = (socket: Socket, io: Server) => {
   

    socket.on('project:join', async (project) => {
        socket.join(project);
    });

    socket.on('project:leave', (projectId) => {
        socket.leave(projectId);
    });

    socket.on('task:create', async (task: TaskT) => {    
        const createdTask = await creatNewTask(task);
        io.to(task.projectId).emit('task:created', createdTask);
    });

    socket.on('task:move', async (task: any) => {

        let updatedTask = await updateTaskState(task);
        io.to(task.projectId).emit('task:moved', { task: updatedTask, from: task.from });
    });

    socket.on('task:update', async (task: TaskT) => {
        let updatedTask = await updateTaskData(task);
        io.to(task.projectId).emit('task:updated', updatedTask);
    });

    socket.on('task:delete', async (data: { taskId: string; projectId: string }) => {
        let deletedTask = await deleteTask(data.taskId);
        io.to(data.projectId).emit('task:deleted', deletedTask);
    });

};
