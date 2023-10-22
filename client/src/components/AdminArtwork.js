import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { deploy_api_url } from "../Config"; //the api base url

function AdminArtwork() {
  const [artworkId, setArtworkId] = useState("");
  const [artwork, setArtwork] = useState();
  const Navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const searchArtwork = async () => {
    try {
      const response = await Axios.get(
        `${deploy_api_url}/api/artworks/${artworkId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setArtwork(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    Modal.setAppElement("#artwork-container");
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [idToDelete, setIdToDelete] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    //   setIdToDelete(artwork._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    //   setIdToDelete(null);
  };

  const handleDelete = () => {
    if (artwork && artwork._id) {
      Axios.delete(`${deploy_api_url}/api/artworks/${artwork._id}`)
        .then((response) => {
          console.log(response.data);
          setArtwork(null);
          closeModal();
        })
        .catch((error) => {
          console.log(error);
          closeModal();
        });
    }
  };

  return (
    <div
      id="artwork-container"
      className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:border-blue-500 transform hover:-translate-y-1 transition duration-300"
    >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-red-200 w-80 p-4 rounded shadow-lg">
          <h2 className="text-lg font-semibold">Confirm delete</h2>
          <p>Are you sure you want to remove it?</p>
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Confirm
            </button>
            <button
              className="px-4 py-2 ml-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <h3 className="text-xl font-bold text-blue-600 mb-4">
        Artwork Management
      </h3>
      <label
        htmlFor="purchaseId"
        className="block text-sm font-medium text-gray-600 text-left mx-2"
      >
        Enter Artwork ID:
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id="userId"
          value={artworkId}
          onChange={(e) => setArtworkId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        />
        <button
          onClick={searchArtwork}
          className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-10"
        >
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
                    {artwork._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
                    {artwork.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
                    {artwork.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
                    <button
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                      onClick={() => {
                        Navigate(`/details/${artwork._id}`, {
                          state: { page: "myAssets" }, //fix me: page attribute
                        });
                      }}
                    >
                      View
                    </button>
                    <button
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-red-900 text-white mt-2`}
                      onClick={openModal}
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
