import Task from "../models/task";

export const creatNewTask = async (data:any) => {
    try {
 
        const task = new Task(data);
        
        await task.save();
        return task;
    } catch (error) {
    }
}

export const updateTaskState = async (data: any) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(data.taskId, {
            state: data.to,
        }, { new: true });

        
        return updatedTask;

    } catch (error) {
    }
}

export const updateTaskData = async (data: any) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(data.taskId, data, { new: true });

        return updatedTask;

    } catch (error) {
    }
}

export const deleteTask = async (taskId: string) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        return deletedTask;

    } catch (error) {
    }
}

