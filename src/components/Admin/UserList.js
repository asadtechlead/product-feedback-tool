import React, {useEffect, useState} from 'react';
import {deleteUser, getUserList} from "../../services/ApiService";
function UserList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    async function fetchUsers(page = 1) {
        setLoading(true)
        try {
            const response = await getUserList(page);
            if (!response.users) {
                setLoading(false)
                setError("Something Went Wrong!")
                return;
            }
            setUsers(response.users.data);
            setLoading(false);
            setPagination({
                currentPage: response.users.current_page,
                lastPage: response.users.last_page,
            });
        } catch (error) {
            setLoading(false)
            setError(error.message ? error.message : error)
            console.error('Fetch feedback error:', error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDeleteUser = async (id) => {
        try {
            const response = await deleteUser(  id  );
            if(response.status)
            {
                setError("User Deleted Successfully");
                setTimeout(() => {
                    let u = users.filter(user => user.id !== id)
                    if(u.length > 1)
                    {
                        setUsers(u);
                    }
                    else
                    {
                        fetchUsers(1)
                    }
                    setError(null)
                }, 500)
            }
            else
            {
                setError(response.message);
                setTimeout(() => {
                    setError(null)
                }, 2500)
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }
    return (
        <div className="container mx-auto">
            <h2 className="text-xl font-bold mb-2">User List</h2>
            {error || loading ? (
                    <div className="grid place-items-center mt-20">
                        <p className="text-red-500 text-xl font-bold">{error || loading}</p>
                    </div>
                )
                : (
                    <>
                        <table className=" min-w-full bg-white">
                            <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="w-1/3 py-2">Name</th>
                                <th className="w-1/3 py-2">Email</th>
                                <th className="w-1/3 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">

                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="text-center py-2">{user.name}</td>
                                    <td className="text-center py-2">{user.email}</td>
                                    {!user.is_admin ? (<td className="text-center py-2">
                                        <button className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDeleteUser(user.id)}>Delete
                                        </button>
                                    </td>) : <td className="text-center py-2">Admin Account</td>}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between mt-4">
                            <button
                                disabled={pagination.currentPage === 1}
                                onClick={() => fetchUsers(pagination.currentPage - 1)}
                                className={`px-4 py-2 rounded-lg ${pagination.currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                            >
                                Previous
                            </button>
                            <button
                                disabled={pagination.currentPage === pagination.lastPage}
                                onClick={() => fetchUsers(pagination.currentPage + 1)}
                                className={`px-4 py-2 rounded-lg ${pagination.currentPage === pagination.lastPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                            >
                                Next
                            </button>
                        </div>

                    </>
                )}

        </div>
    );
}

export default UserList;
