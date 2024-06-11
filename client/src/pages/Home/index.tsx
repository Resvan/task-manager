import { useEffect, useState } from "react";
import AddProject from "../../components/Modals/AddProject";
import { useSelector } from "react-redux";
import axios from "axios";
import { ProjectT } from "../../types";
import UsersListModal from "../../components/Modals/UsersListModal";
import { useNavigate } from "react-router";


const Home = () => {

    const token = useSelector((state: any) => state.auth.token);
    const user = useSelector((state: any) => state.auth.user);
    const [modalOpen, setModalOpen] = useState(false);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [projects, setProjects] = useState<ProjectT[]>([]);
    const [projectId, setProjectId] = useState('');

    const navigate = useNavigate();

    

    const openModal = () => {
        setModalOpen(true);
    };

    const openModalUser = (proId: string) => {
        setProjectId(proId);
        setUserModalOpen(true);
    };

    const closeModalUser = () => {
        setUserModalOpen(false);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleAddProject = async (data: any) => {
        try {
            let response = await axios.post('http://localhost:3001/api/project', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects([response.data, ... projects]);
        } catch (error) {
            console.log(error);

        }
    }

    const getAllProjectsByUser = async() => {
        try {
            let response = await axios.get('http://localhost:3001/api/project', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getAllProjectsByUser();
    }, [token]);



    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                    <button
                        onClick={openModal}
                        className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Create Project
                </button>
            </div>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sl
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Options
                            </th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            projects?.map((pro: any, index: number) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index+1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pro?.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro?.description}
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        {
                                            pro?.createdBy === user.id &&
                                            <button
                                                onClick={() => openModalUser(pro?.id)}
                                                className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                Add User
                                            </button>
                                        }
                                      
                                        <button
                                            onClick={() => navigate(`/project/${pro.id}`)}
                                            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                                           View Project
                                        </button>
                                    </td>
                                </tr> 
                            ))
                        }
                </tbody>
            </table>
            </div>
            <AddProject
                isOpen={modalOpen}
                onClose={closeModal}
                setOpen={setModalOpen}
                handleAddProject={handleAddProject}
            />
            <UsersListModal
                isOpen={userModalOpen}
                onClose={closeModalUser}
                setOpen={setUserModalOpen}
                proId={projectId}
            />
        </>
    )
}

export default Home;
