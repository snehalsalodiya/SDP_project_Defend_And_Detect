/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../storage/auth";
import {NavLink} from 'react-router-dom';
export const AdminUsers = () => {
    const { TokenAuthorization } = useAuth();
    
    /*******************************
     to store data from backend...
     *******************************/
    const [users, setUsers] = useState([]);

    const getAllUserData = async () => {
        try {
            const Response = await fetch('http://localhost:5000/api/admin/users', {
                method: "GET",
                headers: {
                    "Authorization": TokenAuthorization,
                },
            });
            
            const data = await Response.json();
            setUsers(data);
            console.log(`users ${data}`);
        } catch (error) {
            console.log("not get data for admin");
        }
    }
    
    /*******************************
     * to delete user from  stored data from backend...
    *******************************/
   console.log(TokenAuthorization);
   const deleteUser = async (id) => {
       try {
           console.log(`user id :${id}`);
           const Response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
               method: "DELETE",
               headers: { 
                   "Authorization": TokenAuthorization,
                },
            });
            if (Response.ok) {
                console.log("resopnse getted...");
                // Assuming the server returns a single user object
                const deletedUser = await Response.json();
                
                // If 'deletedUser' is an array, you might need to adjust this part
                setUsers(prevUsers => prevUsers.filter(user => user._id !== deletedUser._id));
           
                const updatedUsers = users.filter(user => user._id !== deletedUser._id);
           //     setUsers(updatedUsers);
           console.log(updatedUsers);
           
           console.log(`User with id ${id} deleted successfully`);
        } else {
            // Handle non-successful response
            console.log('Delete operation failed');
        }
    } catch (error) {
        console.log("Error during delete operation:", error);
    }
};

    useEffect(() => {
        getAllUserData();
        
    }, []);

    return (
        <>
    {/* <section className="admin-users-section  text-white">
                            
        <div className="container">
        <h1 className="mt-2 main-heading text-7xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r  from-cyan-400 to-gray-500 text-transparent bg-clip-text">
               USER DATA
            </span>
        </h1>
        </div>
        <div className="container mx-auto admin-users mt-4">
            <table className=" min-w-full  rounded-lg overflow-hidden">
                <thead className="bg-gray-300 text-black">
                    <tr>
                        <th className="py-2  border-b">Name</th>
                        <th className="py-2  border-b">Email</th>
                        <th className="py-2  border-b">Phone</th>
                        <th className="py-2  border-b">Update</th>
                        <th className="py-2  border-b">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((currUser, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}>
                            <td className="py-2 px-4 border-b">{currUser.username}</td>
                            <td className="py-2 px-4 border-b">{currUser.email}</td>
                            <td className="py-2 px-4 border-b">{currUser.phone}</td>
                           
                            <td className="py-2 px-4 border-b">
                                <NavLink
                                    to={`/update/${currUser._id}`}
                                    className="bg-green-600 text-white py-1 px-2 rounded focus:outline-double focus:shadow-md transition duration-300 hover:bg-yellow-700"
                                >
                                    Edit
                                </NavLink>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => deleteUser(currUser._id)}
                                    className="bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> */}
    {/* </section> */}
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div className="py-3 px-4">
              <div className="relative max-w-xs">
                <label htmlFor="hs-table-with-pagination-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  name="hs-table-with-pagination-search"
                  id="hs-table-with-pagination-search"
                  className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Search for items"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-0 pe-0">
                      {/* <div className="flex items-center h-5"> */}
                        
                      {/* </div> */}
                    </th>
                    <th scope="col" className=" text-center font-medium text-white uppercase">
                      EMAIL
                    </th>
                    
                    <th scope="col" className="px-7 py-3 text-center  font-medium text-white uppercase">
                      MOBILE NO
                    </th>
                    <th scope="col" className="px-6 py-3 text-center  font-medium text-white uppercase">
                      update
                    </th>
                    <th scope="col" className="px-6 py-3 text-center  font-medium text-white uppercase">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((currUser, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                            <td className="py-2 px-4 border-b">{currUser.username}</td>
                            <td className="py-2 px-4 border-b">{currUser.email}</td>
                            <td className="py-2 px-4 border-b">{currUser.phone}</td>
                           
                            <td className="py-2 px-4 border-b">
                                <NavLink
                                    to={`/update/${currUser._id}`}
                                    className="bg-green-600 text-white py-1 px-2 rounded focus:outline-double focus:shadow-md transition duration-300 hover:bg-yellow-700"
                                >
                                    Edit
                                </NavLink>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => deleteUser(currUser._id)}
                                    className="bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="py-1 px-4">
              <nav className="flex items-center space-x-1">
                <button
                  type="button"
                  className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-black dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </button>
                {/* ... Pagination buttons ... */}
                <button
                  type="button"
                  className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-black dark:hover:bg-white/10"
                  aria-current="page"
                >
                  1
                </button>
                <button
                  type="button"
                  className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-black dark:hover:bg-white/10"
                >
                  2
                </button>
                <button
                  type="button"
                  className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-black dark:hover:bg-white/10"
                >
                  3
                </button>
                <button
                  type="button"
                  className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-black dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Next</span>
                  <span aria-hidden="true">»</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
</>

);
}