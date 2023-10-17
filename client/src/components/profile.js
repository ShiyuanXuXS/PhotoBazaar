import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";

function ProfileComponent() {
  let { id } = useParams();
  const Navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatepwd, setUpdatepwd] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/userProfile/${id}`)
      .then((res) => {
        setUser(res.data.user);
        console.log("profile basic infor res.data.user:" + res.data.user.email);
      });
  }, [id]);

  const editUsername = (event) => {
    event.preventDefault();
    console.log("inside edit user name function front end" + username);
    axios
      .put(`http://localhost:3001/api/users/changeusername/${user.email}`, {
        username,
      })
      .then((response) => {
        if (response.data.error) {
          const { message: resMessage } = error.response.data;
          setError(resMessage);
        } else {
          const { message: resMessage } = response.data;
          setMessage(resMessage);
        }
      })
      .catch((error) => {
        const { message: resMessage } = error.response.data;
        setError(resMessage);
      });
  };

  const enableUpdatepwd = (event) => {
    event.preventDefault();
    setUpdatepwd(true);
  };

  const updatePassword = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/api/users/changepassword/${user.email}`, {
        password,
        confirmPassword,
      })
      .then((response) => {
        if (response.data.error) {
          const { message: resMessage } = error.response.data;
          setError(resMessage);
        } else {
          const { message: resMessage } = response.data;
          setMessage(resMessage);
          // Navigate("/login");
        }
      })
      .catch((error) => {
        const { message: resMessage } = error.response.data;
        setError(resMessage);
      });
  };

  return (
    <div className="my-4">
      <div className="container mx-auto capitalize">
        <form>
          {/* user id field */}
          <div className="mb-4">
            <label htmlFor="formArtworkId" className="block font-medium mb-2">
              User Id:
            </label>
            <input
              type="text"
              id="_id"
              name="_id"
              className="block w-1/2 border border-gray-300 rounded p-2"
              defaultValue={user._id}
              readOnly
            />
          </div>
          {/* user name field */}
          <div className="mb-4">
            <label htmlFor="formArtworkId" className="block font-medium mb-2">
              User name:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className=" w-1/2 border border-gray-300 rounded p-2"
              defaultValue={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
              onClick={(event) => editUsername(event)}
            >
              Update
            </button>
          </div>

          {/* user email field */}
          <div className="mb-4">
            <label htmlFor="formArtworkId" className="block font-medium mb-2">
              User email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="block w-1/2 border border-gray-300 rounded p-2"
              defaultValue={user.email}
              readOnly
            />
          </div>

          {/* user role field */}
          <div className="mb-4">
            <label htmlFor="formArtworkId" className="block font-medium mb-2">
              User role:
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className="block w-1/2 border border-gray-300 rounded p-2"
              defaultValue={user.role}
              readOnly
            />
          </div>
          <button
            className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
            onClick={(event) => enableUpdatepwd(event)}
          >
            upadate password
          </button>
          {updatepwd ? (
            <div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2">
                  new password:
                </label>
                <input
                  placeholder="new password..."
                  type="password"
                  id="password"
                  name="password"
                  className="block w-1/2 border border-gray-300 rounded p-2"
                  defaultValue=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block font-medium mb-2"
                >
                  confirm password:
                </label>
                <input
                  placeholder="confirm new password..."
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="block w-1/2 border border-gray-300 rounded p-2"
                  defaultValue=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                onClick={(event) => updatePassword(event)}
              >
                submit new password
              </button>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
      <div className="mb-4">
        {error && <div className="text-red-500 mb-8">{error}</div>}
        {message && <div className="text-green-500 mb-8">{message}</div>}
      </div>
    </div>
  );
}

export default ProfileComponent;
