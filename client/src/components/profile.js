import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import { AuthContext } from "../Helpers/AuthContext";

function ProfileComponent() {
  let { _id } = useParams();
  const [basicInfo, setbasicinfo] = useState({});
  const [details, setdetails] = useState({});
  const [listOfArtworks, setArtworklist] = useState([]);
  const Navigate = useNavigate();
  // const { authStatus } = useContext(AuthContext);
  const { loginStatus, role, userId } = useContext(AuthContext);

  useEffect(() => {
    console.log("user id is:" + userId);
    axios
      .get(`http://localhost:3001/api/users/userProfile/${userId}`)
      .then((res) => {
        setbasicinfo(res.data.basicInfo);
      });

    // axios.get(`http://localhost:3001/posts/user/${id}`).then((res) => {
    //   setPosts(res.data);
    // });
  }, [_id]);

  // let d = new Date(Date.parse(basicInfo.createdAt));

  return (
    <>// FIXME: change to tailwind
      <div className="Profile">
        <div className="userDesc">
          <div className="Image">
            <i className="bi bi-person"></i>
          </div>
          <div className="Desc">
            <div className="Name">{basicInfo.username}</div>
            <Link
              to={`mailto:${basicInfo.email}?&subject=Feedback from the users`}
            >
              <i className="bi bi-envelope-at-fill"></i>
              {basicInfo.email}
            </Link>
          </div>
          <div className="additional">
            <div className="Date">user name {basicInfo.username}</div>

            {basicInfo._id === userId && (
              <button>
                <Link to="/changepwd">
                  <i className="bi bi-key-fill"></i>Change Password
                </Link>
              </button>
            )}
          </div>
        </div>

        <h1>My Artworks</h1>
        {/* <div className="Posts">
          {listOfPosts.map((value, key) => {
            return (
              <div className="post">
                <div className="title">{value.title}</div>
                <div className="footer">By @{value.username}</div>
                <div className="body">{ReactHtmlParser(value.postText)}</div>
                <div className="icons">
                  <i className="bi bi-hearts"></i>
                  <span>{value.Likes.length}</span>
                  <button onClick={() => Navigate(`/post/${value.id}`)}>
                    View Post
                  </button>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
}

export default ProfileComponent;
