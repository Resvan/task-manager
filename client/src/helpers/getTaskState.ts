import { BackendState } from "../types";

type TaskState = 'todo' | 'pending' | 'done';


const getTaskState = (state: BackendState): TaskState => {
    switch (state) {
        case 'TODO':
            return 'todo';
        case 'IN_PROGRESS':
            return 'pending';
        case 'DONE':
            return 'done';
        default:
            throw new Error('Invalid state');
    }
};

export default getTaskState;