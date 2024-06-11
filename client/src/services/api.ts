import axios from 'axios';


const API_URL = 'http://localhost:3001/api/tasks';

export const getTasks = (token: string, id: string) => {
    return axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const uploadFilePost = async (file: File | string, folder: string, removed?: string): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        if (removed) {
            formData.append('removed', removed);
        }

        const { data } = await axios.post(`http://localhost:3001/api/file/upload-file`, formData);

        return data?.file_url ?? '';
    } catch (error) {
        console.error(error);
        return '';
    }
};
