import axios from "axios";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface UserListProps {
    isOpen: boolean;
    onClose: () => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    proId: string
}


const UsersListModal = ({ isOpen, onClose, setOpen, proId  }: UserListProps) => {

    const token = useSelector((state: any) => state.auth.token);

    const [users, setUsers] = useState<any[]>([]);

    const [checkedIds, setCheckedIds] = useState<string[]>([]);

    const handleChange = (userId: string) => {
        const isChecked = checkedIds.includes(userId);
        if (isChecked) {
            setCheckedIds(checkedIds.filter(id => id !== userId));
        } else {
            setCheckedIds([...checkedIds, userId]);
        }
    };

    const handleSubmit = async() => {
        try {
            let response = await axios.post('http://localhost:3001/api/project/add-members',{users: checkedIds, projectId: proId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            closeModal();
            
        } catch (error) {
            console.log(error);

        }
    }

    const getProjectMembers = async () => {
        if (proId) {
            try {
                let response = await axios.get(`http://localhost:3001/api/project/get-members/${proId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCheckedIds(response.data.users);

            } catch (error) {
                console.log(error);

            }
        }
    }


    const closeModal = () => {
        setOpen(false);
        setCheckedIds([]);
        onClose();
    };

    const getAllUser = async () => {
        try {
            let response = await axios.get('http://localhost:3001/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getAllUser();
        getProjectMembers();
    }, [token, proId]);


    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-20 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white p-8 rounded-md shadow-md w-11/12 md:w-2/3">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Users</h2>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user: any, index: number) => (
                                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <input
                                                    checked={checkedIds?.includes(user.id)}
                                                    onChange={()=>handleChange(user.id)}
                                                    id="checked-checkbox"
                                                    type="checkbox"
                                                    value=""
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-5 gap-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        Submit
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
    )
}

export default UsersListModal