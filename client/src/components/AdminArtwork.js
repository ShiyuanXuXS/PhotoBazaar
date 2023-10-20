import React, { useState } from 'react';
import axios from 'axios';

function AdminArtwork() {
  const [artworkId, setArtworkId] = useState('');
  const [artwork, setArtwork] = useState();
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('accessToken');
  const searchArtwork = async () => {
    try {
      const response = await axios.get(`${url}/api/artworks/${artworkId}`,{
        headers: { Authorization: `Bearer ${token}` }
        }); 
      setArtwork(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:border-blue-500 transform hover:-translate-y-1 transition duration-300">
      <h3 className="text-xl font-bold text-blue-600 mb-4">Artwork Management</h3>
      <label htmlFor="purchaseId" className="block text-sm font-medium text-gray-600 text-left mx-2">
        Enter Artwork ID:
      </label>
      <div className='flex items-center'>
        <input
          type="text"
          id="userId"
          value={artworkId}
          onChange={(e) => setArtworkId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        />
        <button 
          onClick={searchArtwork}
          className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-10">
          Search
        </button>
      </div>
      

      {artwork && (
        <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                OP
              </th>
            </tr>
          </thead>
          <tbody>
            {artwork && (
              <tr key={artwork._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{artwork._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{artwork.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{artwork.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
                    <button
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                      onClick={(event) => {
                        
                      }}
                    >
                     View
                    </button>
                    <button
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-red-600 text-white mt-2`}
                      onClick={(event) => {
                        
                      }}
                    >
                     Delete
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

export default AdminArtwork;
