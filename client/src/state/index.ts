import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getTaskState from "../helpers/getTaskState";
import { TaskT } from "../types";

interface TaskState {
    todo: TaskT[];
    pending: TaskT[];
    done: TaskT[];
}

const initialState: TaskState = {
    todo: [],
    pending: [],
    done: []
};

type TaskStateKeys = keyof TaskState;

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        updateTasks: (state, action) => {
            const tasks = action.payload;
            state.todo = tasks.find((task:any) => task._id === 'TODO')?.items;
            state.pending = tasks.find((task:any) => task._id === 'IN_PROGRESS')?.items;
            state.done = tasks.find((task:any) => task._id === 'DONE')?.items;
        },
        setToDo: (state, action) => {
            state.todo = action.payload.todo;
        },
        setInProgress: (state, action) => {
            state.pending = action.payload.pending;
        },
        setDone: (state, action) => {
            state.done = action.payload.done;
        },
        updateState: (state, action: PayloadAction<{ task: TaskT, fromState: any, toState: any, taskId: string }>) => {
            let from: TaskStateKeys = getTaskState(action.payload.fromState);
            let to: TaskStateKeys = getTaskState(action.payload.toState);
            state[from] = state[from].filter((t) => t._id !== action.payload.taskId);
            if (!Array.isArray(state[to])) {
                state[to] = [];
            }
            state[to] = [action.payload.task, ...state[to]]
        },
        updateTask: (state, action: PayloadAction<{ task: TaskT, taskState:any }>) => {
            let taskKey: TaskStateKeys = getTaskState(action.payload.taskState);
            let foundIndex = state[taskKey].findIndex(t => t._id === action.payload.task._id);
            if (foundIndex !== -1) {
                state[taskKey][foundIndex] = action.payload.task;
            }
        },
        deleteTask: (state, action: PayloadAction<{ task: TaskT, taskState:any }>) => {
            let taskKey: TaskStateKeys = getTaskState(action.payload.taskState);
            state[taskKey] = state[taskKey].filter(t => t._id !== action.payload.task._id)
        }
    },
});

export const {
    setToDo, setInProgress, setDone, updateTasks, updateState, updateTask, deleteTask
} = taskSlice.actions;

export default taskSlice.reducer;