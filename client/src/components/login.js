import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const authUser = () => {
    Axios.post("http://localhost:3001/api/users/auth", {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        //FIXME: only show message when successfully login
        if (response.data.error) {
          alert("fff"); // Display the error message
          // alert(response.data.error);
        } else if (response.data.message) {
          alert("eee"); // Display the error message

          alert(response.data.message); // Display success message or token
          sessionStorage.setItem("accessToken", response.data.token);
          navigateToHome();
        }
      })
      .catch((error) => {
        // fix me : how to show backend errors, Handle errors
        // alert(error); // Display the error message
        alert("login failed"); // Display the error message
      });
  };

  return (
    <div className="form-signin w-50 m-auto">
      <Container>
        <Form>
          <h1 className="h3 my-5 fw-normal">Please Signin</h1>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label className="text-left">Useremail:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-left">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button onClick={authUser}>Login</Button>
        </Form>
      </Container>
    </div>
  );
}

export default LoginComponent;
