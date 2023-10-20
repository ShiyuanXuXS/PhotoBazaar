import React, { useState } from 'react';
import axios from 'axios';

function AdminUser() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('accessToken');
  const searchUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${url}/api/users/id/${userId}`,{
        headers: { Authorization: `Bearer ${token}` }
        }); 
      setUser(response.data);
      console.log(response.data)
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
    //disable/Enable an existing user by email
    const disableUser = (disableorenable) => {
        const requestUrl = (disableorenable === "disable")?`${url}/api/users/disableuser/${user.email}`: `${url}/api/users/enable/${user.email}`;
        axios
          .get(requestUrl)
          .then((response) => {
            if (!response.data.error)  {
                const updatedUser={...user,role:(disableorenable === "disable")?"disable":"user"};
                setUser(updatedUser)
            }
          })
          .catch((error) => {
          });
      };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:border-blue-500 transform hover:-translate-y-1 transition duration-300">
      <h3 className="text-xl font-bold text-blue-600 mb-4">User management</h3>
      <label htmlFor="purchaseId" className="block text-sm font-medium text-gray-600 text-left mx-2">
        Enter User ID:
      </label>
      <div className='flex items-center'>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        />
        <button 
          onClick={searchUser}
          className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-10">
          Search
        </button>
      </div>
      

      {isLoading ? (
        <p className="mt-4 text-gray-600">Loading...</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                OP
              </th>
            </tr>
          </thead>
          <tbody>
            {user && (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{user._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{user.role}</td>
                <td><button
                    //   type="submit"
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                      onClick={(event) => {
                        disableUser(
                          user.role == "disable" ? "enable" : "disable"
                        );
                      }}
                    >
                      {user.role != "disable" ? <>Disable</> : <>Enable</>}
                    </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default AdminUser;
