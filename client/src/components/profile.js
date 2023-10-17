import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";

function ProfileComponent() {
  let { id } = useParams();
  const [basicInfo, setbasicinfo] = useState({});
  const Navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    console.log("profile basic infor:" + id);

    axios
      .get(`http://localhost:3001/api/users/userProfile/${id}`)
      .then((res) => {
        setUser(res.data.user);
        console.log("profile basic infor res.data.user:" + res.data.user.email);
        console.log("profile basic infor email:" + user.email);
      });
  }, [id]);

  return (
    <div className="w-1/2 mx-auto">
      <form>
        <h1 className="text-3xl my-5 font-bold text-center">User profile</h1>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700">
            User Id:{user._id}
          </label>
          <label className="text-left block text-sm font-medium text-gray-700">
            User name:{user.username}
          </label>
          <label className="text-left block text-sm font-medium text-gray-700">
            User email:{user.email}
          </label>
          <label className="text-left block text-sm font-medium text-gray-700">
            User role:{user.role}
          </label>
        </div>
      </form>

      {error && <div className="text-red-500 mb-8">{error}</div>}
      {message && <div className="text-green-500 mb-8">{message}</div>}
    </div>
  );

  // return (
  //   <>
  //     // FIXME: change to tailwind
  //     <div className="Profile">
  //       <div className="userDesc">
  //         <div className="Image">
  //           <i className="bi bi-person"></i>
  //         </div>
  //         <div className="Desc">
  //           <div className="Name">{basicInfo.username}</div>
  //           <Link
  //             to={`mailto:${basicInfo.email}?&subject=Feedback from the users`}
  //           >
  //             <i className="bi bi-envelope-at-fill"></i>
  //             {basicInfo.email}
  //           </Link>
  //         </div>
  //         <div className="additional">
  //           <div className="Date">user name {basicInfo.username}</div>

  //           {basicInfo._id === userId && (
  //             <button>
  //               <Link to="/changepwd">
  //                 <i className="bi bi-key-fill"></i>Change Password
  //               </Link>
  //             </button>
  //           )}
  //         </div>
  //       </div>

  //       <h1>My Artworks</h1>
  //       {/* <div className="Posts">
  //         {listOfPosts.map((value, key) => {
  //           return (
  //             <div className="post">
  //               <div className="title">{value.title}</div>
  //               <div className="footer">By @{value.username}</div>
  //               <div className="body">{ReactHtmlParser(value.postText)}</div>
  //               <div className="icons">
  //                 <i className="bi bi-hearts"></i>
  //                 <span>{value.Likes.length}</span>
  //                 <button onClick={() => Navigate(`/post/${value.id}`)}>
  //                   View Post
  //                 </button>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div> */}
  //     </div>
  //   </>
  // );
}

export default ProfileComponent;
