import React, { useEffect, useState } from "react";
import Axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

function SignupComponent() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userNameExists, setUserNameExists] = useState([]);
  const [emailExists, setEmailExists] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/users")
      .then((response) => {
        var username = response.data.map((user) => user.username);
        setUserNameExists(username);
        var email = response.data.map((user) => user.email);
        setEmailExists(email);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "User name must be at least 2 characters")
      .max(20, "User name must not exceed 20 characters")
      .matches(/^[a-z0-9]+$/, "Must contain only lowercase letters and numbers")
      .test("unique-username", "User name already exists", (value) => {
        // Check if the username exists
        return !userNameExists.includes(value);
      })
      .required("User name is required"),
    password: Yup.string()
      .min(4, "Password must be at least 2 characters")
      .max(100, "Password must not exceed 100 characters")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(
        /[0-9!@#$%^&*(),.?":{}|<>]/,
        "Must contain at least one number or special character"
      )
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .test("unique-email", "Email already exists", (value) => {
        // Check if the username exists in itemNameExists
        return !emailExists.includes(value);
      })
      .required("Seller email is required"),
  });

  const addUser = () => {
    validationSchema
      .validate(
        {
          username,
          password,
          email,
        },
        { abortEarly: false } // Collect all validation errors, not just the first one
      )
      .then(() => {
        Axios.post("http://localhost:3001/api/users", {
          username,
          password,
          email,
          role: "user",
        })
          .then((response) => {
            // Handle the response if needed
            console.log(response.data);
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
          });
      })
      .catch((validationErrors) => {
        // Validation failed; handle the errors
        alert(validationErrors.errors);
      });
  };

  return (
    // <div className="form-signup w-50 m-auto">
    //   <Container>
    //     <Form>
    //       <h1 className="h3 my-5 fw-normal">Please Register to Photobazaar</h1>
    //       <Form.Group className="mb-3" controlId="formUserName">
    //         <Form.Label className="text-left">Username:</Form.Label>
    //         <Form.Control
    //           type="text"
    //           placeholder="Enter username"
    //           name="username"
    //           value={username}
    //           onChange={(e) => setUserName(e.target.value)}
    //         />
    //         <Form.Text className="text-muted">
    //           Required, 4-20 characters, contains only numbers and lowercase
    //           letters.
    //         </Form.Text>
    //       </Form.Group>

    //       <Form.Group className="mb-3" controlId="formPassword">
    //         <Form.Label className="text-left">Password:</Form.Label>
    //         <Form.Control
    //           type="password" // hide the password
    //           placeholder="Enter password"
    //           name="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Form.Text className="text-muted">
    //           Required, 6-100 characters, at least one uppercase letter, one
    //           lowercase letter, one number or special character.
    //         </Form.Text>
    //       </Form.Group>

    //       <Form.Group className="mb-3" controlId="formEmail">
    //         <Form.Label className="text-left">Email:</Form.Label>
    //         <Form.Control
    //           type="email"
    //           placeholder="Enter email"
    //           name="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <Form.Text className="text-muted">
    //           Required, please provide a valid email.
    //         </Form.Text>
    //       </Form.Group>

    //       <Button onClick={addUser}>Register</Button>
    //     </Form>
    //   </Container>
    // </div>

    <div className="w-1/2 mx-auto">
      <form>
        <h1 className="text-3xl my-5 font-bold text-center">
          Please Register to Photobazaar
        </h1>

        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700">
            Username:
          </label>

          <input
            type="text"
            placeholder="Enter username"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />

          <p className="text-sm text-gray-500">
            Required, 4-20 characters, contains only numbers and lowercase
            letters.
          </p>
        </div>

        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700">
            Password:
          </label>

          <input
            type="password" // hide the password
            placeholder="Enter password"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-sm text-gray-500">
            Required, 6-100 characters, at least one uppercase letter, one
            lowercase letter, one number or special character.
          </p>
        </div>

        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700">
            Email:
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="text-sm text-gray-500">
            Required, please provide a valid email.
          </p>
        </div>

        <button
          onClick={addUser}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignupComponent;

// use formik
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// function SignupComponent() {

//     const initialValues = {
//         userName: "",
//         password: "",
//         email: "",
//     }

//     const validationSchema = Yup.object().shape({
//         userName: Yup.string().min(4).max(20).required(),
//         password: Yup.string().min(4).max(100).required(),
//         email: Yup.string().email().required(),
//     });

//     const onSubmit = (data) => {
//         console.log(data);
//     }
//     return (
//         <div className='form-signup'>
//             <Formik initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={onSubmit}>
//                 <Form className="createUserFormContainer">
//                     <label>Username:</label>
//                     <ErrorMessage name="userName" component="span" />
//                     <Field
//                         id="inputUser"
//                         name="userName"
//                         placeholder="Enter username"
//                     />
//                     <br />
//                     <label>Password:</label>
//                     <ErrorMessage name="password" component="span" />
//                     <Field
//                         id="inputUser"
//                         name="password"
//                         type="password"
//                         placeholder="Enter password"
//                     />
//                     <br />

//                     <label>Email:</label>
//                     <ErrorMessage name="email" component="span" />
//                     <Field
//                         id="inputUser"
//                         name="email"
//                         type='email'
//                         placeholder="Enter email"
//                     />
//                     <br />
//                     <button type='submit'>Register</button>
//                 </Form>

//             </Formik>
//         </div>
//     )
// }
