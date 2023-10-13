import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
// import ForgotPassword from "../pages/ForgotPassword";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authStatus, setAuthStatus } = useContext(AuthContext);
  const Navigate = useNavigate("");
  const navigateToForgot = () => {
    Navigate("/forgotpassword");
  };

  useEffect(() => {
    //fixme:
    // if (authStatus.status) Navigate("/login");
    if (authStatus.status) Navigate("/");
  });
  //user login
  const authUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/users/auth", {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        //FIXME: only show message when successfully login
        if (response.data.error) {
          // alert("fff"); // Display the error message
          alert(response.data.error);
        } else if (response.data.message) {
          alert(response.data.message); // Display success message or token
          //set token
          localStorage.setItem("accessToken", response.data.token);
          setAuthStatus({
            email: response.data.email,
            _id: response.data._id,
            status: true,
            username: response.data.username,
          });
          Navigate("/");
        }
      })
      .catch((error) => {
        // fix me : how to show backend errors, Handle errors
        // alert(error); // Display the error message
        alert("login failed"); // Display the error message
      });
  };

  return (
    // <div className="form-signin w-50 m-auto">
    //   <Container>
    //     <Form>
    //       <h1 className="h3 my-5 fw-normal">Please Signin</h1>
    //       <Form.Group className="mb-3" controlId="formUserName">
    //         <Form.Label className="text-left">User email:</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter user email"
    //           name="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </Form.Group>

    //       <Form.Group className="mb-3" controlId="formPassword">
    //         <Form.Label className="text-left">Password:</Form.Label>
    //         <Form.Control
    //           type="password"
    //           placeholder="Enter password"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </Form.Group>
    //       <div>
    //         Forget Password?
    //         <Link to={`/forgotpassword`}>Reset Password</Link>
    //       </div>
    //       <Button onClick={authUser}>Login</Button>
    //     </Form>
    //   </Container>
    // </div>
    //tailwind

    <div className="w-1/2 mx-auto">
      <form>
        <h1 className="text-3xl my-5 font-bold text-center">Please Sign In</h1>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700">
            User email:
          </label>
          <input
            type="text"
            placeholder="Enter user email"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="text-left block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={authUser}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
