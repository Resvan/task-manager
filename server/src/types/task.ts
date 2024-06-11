export type TaskT = {
    _id?: string;
    title: string;
    description: string;
    priority: string;
    deadline: number;
    image?: string | File;
    alt?: string;
    projectId: string;
    tags: { title: string; bg: string; text: string }[];
};

export type ProjectT = {
    _id?: string,
    name: string,
    description: string;
    createBy?: string,
    users: [],
}