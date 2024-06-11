/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { AddOutline } from "react-ionicons";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import {  getTasks, uploadFilePost } from "../../services/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTask, setDone, setInProgress, setToDo, updateState, updateTask, updateTasks } from "../../state";
import { onDragEnd } from "../../helpers/onDragEnd";
import io from 'socket.io-client';
import { TaskT } from "../../types";
import { useParams } from "react-router";


const Project = () => {

    const socket = io('http://localhost:3001');

    
    const { id } = useParams();

    const token = useSelector((state: any) => state.auth.token);
    const todo = useSelector((state: any) => state.task.todo);
    const inprogress = useSelector((state: any) => state.task.pending);
    const done = useSelector((state: any) => state.task.done);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState("");


    const dispatch = useDispatch();

    const openModal = (columnId: any) => {
        setSelectedColumn(columnId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleAddTask = async (taskData: any) => {

        let url;

        if (taskData.image !== undefined) {
            url = await uploadFilePost(taskData.image, 'Task-Images');
        }

        let taskObj = {
            ...taskData, image: url, state:selectedColumn, projectId: id,
        }
        socket.emit('task:create', taskObj);
    };

    const getAllTasks = async () => {
       
            try {
                let res = await getTasks(token, id as string);

                if (res.status === 200) {
                    dispatch(updateTasks(res.data));
                }
            } catch (error) {
                console.log(error);

            }

    };

    useEffect(() => {
        getAllTasks();
    }, [id]);

    useEffect(() => {
        socket.emit('project:join', id);
    }, [id]);

    useEffect(() => {

        

        socket.on('task:created', (data: TaskT) => {
            
            if (data?.state === "TODO") {
                dispatch(setToDo({
                    todo: [data, ...(todo ?? [])]
                }));
            } else if (data?.state === "IN_PROGRESS") {
                console.log(inprogress);
                
                dispatch(setInProgress({
                    pending: [data, ...(inprogress ?? [])]
                }));
            } else if (data?.state === "DONE") {
                dispatch(setDone({
                    done: [data, ...(done ?? [])]
                }));
            }
        });

        socket.on('task:moved', (data: { task: TaskT; from: string}) => {
            dispatch(updateState({
                task: data.task,
                taskId: data.task._id as string,
                fromState: data.from,
                toState: data.task.state,
            }));
        });

        socket.on('task:updated', (data: TaskT) => {
            dispatch(updateTask({
                task: data,
                taskState: data.state
            }))
        });


        socket.on('task:deleted', (data: TaskT) => {
            dispatch(deleteTask({
                task: data,
                taskState: data.state
            }))
        })


        return () => {
            socket.disconnect();
        };
    }, [dispatch, id]);

    return (
        <>
            <DragDropContext onDragEnd={(result: any) => onDragEnd(result, socket, id as string)} >
                <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-2 gap-10">
                    <div
                        className="w-full flex flex-col gap-0"
                    >
                        <Droppable
                            droppableId={'TODO'}
                        >
                            {(provided: any) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                                >
                                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                                        To Do
                                    </div>
                                    <div
                                        onClick={() => openModal('TODO')}
                                        className="flex items-center justify-center cursor-pointer py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                                    >
                                        <AddOutline color={"#555"} />
                                        Add Task
                                    </div>
                                    {todo?.map((task: any, index: number) => (
                                        <Draggable
                                            key={task._id.toString()}
                                            draggableId={task._id.toString()}
                                            index={index}
                                        >
                                            {(provided: any) => (
                                                <>
                                                    <Task
                                                        provided={provided}
                                                        task={task}
                                                        socket={socket}
                                                    />
                                                </>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                       
                    </div>
                    <div
                        className="w-full flex flex-col gap-0"
                    >
                        <Droppable
                            droppableId={'IN_PROGRESS'}
                        >
                            {(provided: any) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                                >
                                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                                        In Progress
                                    </div>
                                    <div
                                        onClick={() => openModal('IN_PROGRESS')}
                                        className="flex items-center justify-center cursor-pointer py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                                    >
                                        <AddOutline color={"#555"} />
                                        Add Task
                                    </div>
                                    {inprogress?.map((task: any, index: number) => (
                                        <Draggable
                                            key={task._id.toString()}
                                            draggableId={task._id.toString()}
                                            index={index}
                                        >
                                            {(provided: any) => (
                                                <>
                                                    <Task
                                                        provided={provided}
                                                        task={task}
                                                        socket={socket}
                                                    />
                                                </>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    </div>
                    <div
                        className="w-full flex flex-col gap-0"
                    >
                        <Droppable
                            droppableId={'DONE'}
                        >
                            {(provided: any) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                                >
                                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                                        Done
                                    </div>
                                    <div
                                        onClick={() => openModal('DONE')}
                                        className="flex items-center justify-center cursor-pointer py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                                    >
                                        <AddOutline color={"#555"} />
                                        Add Task
                                    </div>
                                    {done?.map((task: any, index: number) => (
                                        <Draggable
                                            key={task._id.toString()}
                                            draggableId={task._id.toString()}
                                            index={index}
                                        >
                                            {(provided: any) => (
                                                <>
                                                    <Task
                                                        provided={provided}
                                                        task={task}
                                                        socket={socket}
                                                    />
                                                </>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    </div>
                </div>
            </DragDropContext>

            <AddModal
                isOpen={modalOpen}
                onClose={closeModal}
                setOpen={setModalOpen}
                handleAddTask={handleAddTask}
            />
        </>
    );
};

export default Project;
