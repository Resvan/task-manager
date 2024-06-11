import React, { useState } from "react";

interface AddProjectProps {
    isOpen: boolean;
    onClose: () => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddProject: (projectData: { name: string; description: string }) => void;
}

const AddProject = ({ isOpen, onClose, setOpen, handleAddProject }: AddProjectProps) => {
    const [projectData, setProjectData] = useState({ name: '', description: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const closeModal = () => {
        setOpen(false);
        onClose();
    };

    const handleSubmit = () => {
        handleAddProject(projectData);
        closeModal();
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Create Project</h2>
                <input
                    type="text"
                    name="name"
                    value={projectData.name}
                    onChange={handleChange}
                    placeholder="Project Name"
                    className="block w-full border border-gray-400 rounded-md mb-4 p-2 focus:outline-none focus:ring focus:border-blue-400"
                />
                <textarea
                    name="description"
                    value={projectData.description}
                    onChange={handleChange}
                    placeholder="Project Description"
                    className="block w-full border border-gray-400 rounded-md mb-4 p-2 focus:outline-none focus:ring focus:border-blue-400"
                    rows={4}
                />
                <div className="flex justify-end">
                    <button
                        className="bg-orange-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-orange-400 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
