import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import io from 'socket.io-client';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import { Task } from '../types/Task';

const socket = io('http://localhost:3001');

const TaskBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();

        socket.on('task:created', (task: Task) => {
            setTasks((prevTasks) => [...prevTasks, task]);
        });

        socket.on('task:updated', (updatedTask: Task) => {
            setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        });

        socket.on('task:deleted', (taskId: string) => {
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        });

        return () => {
            socket.off('task:created');
            socket.off('task:updated');
            socket.off('task:deleted');
        };
    }, []);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(updatedTasks);
    };

    const addTask = async (title: string) => {
        const newTask = await createTask({ title, state: 'TODO' });
        socket.emit('task:create', newTask.data);
    };

    const changeTaskState = async (id: string, state: Task['state']) => {
        const updatedTask = await updateTask(id, { state });
        socket.emit('task:update', updatedTask.data);
    };

    const removeTask = async (id: string) => {
        await deleteTask(id);
        socket.emit('task:delete', id);
    };

    return (
        <div className="task-board">
            <h1>Task Manager</h1>
            <button onClick={() => addTask('New Task')}>Add Task</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided : any = {}) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, index) => (
                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                    {(provided:any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div>
                                                <h3>{task.title}</h3>
                                                <select
                                                    value={task.state}
                                                    onChange={(e) => changeTaskState(task._id, e.target.value as Task['state'])}
                                                >
                                                    <option value="TODO">TODO</option>
                                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                    <option value="DONE">DONE</option>
                                                </select>
                                                <button onClick={() => removeTask(task._id)}>Delete</button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard;
