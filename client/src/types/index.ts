export type BackendState = 'TODO' | 'IN_PROGRESS' | 'DONE';


export type TaskT = {
    _id?: string;
    title: string;
    description: string;
    priority: string;
    deadline: number;
    image?: string | File;
    alt?: string;
    state?: BackendState;
    projectId: string;
    tags: { title: string; bg: string; text: string }[];
};

type Column = {
    name: string;
    items: TaskT[];
};


export type Columns = {
    [key: string]: Column;
};


export type ProjectT = {
    _id?: string,
    title: string,
    description: string;
    createBy: string,
    users: []
}