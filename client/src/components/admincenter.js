import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
// import ForgotPassword from "../pages/ForgotPassword";

function AdmincenterCompoment() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate("");
  const [userList, setUserList] = useState([]);
  const [artworkList, setArtworkList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  let { id } = useParams();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    //fetch user list
    axios
      .get(`http://localhost:3001/api/users/userProfile/${id}`)
      .then((res) => {
        setUser(res.data.user);
        if (res.data.user.role == "admin") {
          axios.get("http://localhost:3001/api/users").then((response) => {
            setUserList(response.data);
          });
        }
      });
    //fetch artwork list
    axios
      .get("http://localhost:3001/api/artworks")
      .then((response) => {
        setArtworkList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch the tag list
    axios
      .get("http://localhost:3001/api/tags")
      .then((response) => {
        setTagList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user._id]);

  //disable an existing user by email
  const disableUser = (event, email, disableorenable) => {
    event.preventDefault();
    let requestUrl = "";
    if (disableorenable == "disable") {
      requestUrl = `http://localhost:3001/api/users/disableuser/${email}`;
    } else {
      requestUrl = `http://localhost:3001/api/users/enable/${email}`;
    }
    axios
      .get(requestUrl)
      .then((response) => {
        if (response.data.error) {
          const { message: resMessage } = error.response.data;
          setError(resMessage);
        } else {
          window.location.reload();
          const { message: resMessage } = response.data;
          setMessage(resMessage);
        }
      })
      .catch((error) => {
        const { message: resMessage } = error.response.data;
        setError(resMessage);
      });
  };

  return (
    <div>
      {/* user management */}
      {error && <div className="text-red-500 mb-8">{error}</div>}
      {message && <div className="text-green-500 mb-8">{message}</div>}
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead scope="col" className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
            User Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
            Disable
          </th>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userList.length > 0 ? (
            <>
              {userList.map((user, index) => (
                <div key={index} class="table-row">
                  <div className="table-cell ">{user.username}</div>
                  <div className="table-cell ">{user.email}</div>
                  <div className="table-cell ">{user.role}</div>

                  <div className="table-cell ">
                    <button
                      type="submit"
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                      onClick={(event) => {
                        disableUser(
                          event,
                          user.email,
                          user.role == "disable" ? "enable" : "disable"
                        );
                      }}
                    >
                      {user.role != "disable" ? <>Disable</> : <>Enable</>}
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No users!</p>
          )}
        </tbody>
      </table>
      {/* artwork management */}
      {error && <div className="text-red-500 mb-8">{error}</div>}
      {message && <div className="text-green-500 mb-8">{message}</div>}
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead scope="col" className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Artwork Id
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
            description
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
            delete
          </th>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {artworkList.length > 0 ? (
            <>
              {artworkList.map((artwork, index) => (
                <div key={index} class="table-row">
                  <div className="table-cell ">{artwork._id}</div>
                  <div className="table-cell ">{artwork.description}</div>
                  <div className="table-cell ">{artwork.title}</div>

                  <div className="table-cell ">
                    <button
                      type="submit"
                      className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                      onClick={() => {
                        Navigate(`/details/${artwork._id}`);
                      }}
                    >
                      view
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No artwork!</p>
          )}
        </tbody>
      </table>
      {/* //end artworklist */}
    </div>
  );
}

export default AdmincenterCompoment;
