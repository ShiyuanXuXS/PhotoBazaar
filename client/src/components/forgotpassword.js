import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";
// const { sign, verify } = require("jsonwebtoken");

function ForgotpasswordComponent() {
  const navigate = useNavigate("");
  const [forgotemail, setforgotEmail] = useState("");
  const { authStatus } = useContext(AuthContext);
  const navigateToChange = () => {
    navigate("/changepassword");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(
    //   "inside forgotpw component submithandler forgotemail:" + forgotemail
    // );
    Axios.post("http://localhost:3001/api/users/forgotpassword", {
      forgotemail: forgotemail,
      // token: localStorage.getItem("accessToken"),
    })
      .then((response) => {
        console.log(response);
        //FIXME: only show message when successfully login
        if (response.data.error) {
          // alert("fff"); // Display the error message
          alert(response.data.error);
        } else {
          alert(response.data.message); // Display success message or token
        }
      })
      .catch((error) => {
        // fix me : how to show backend errors, Handle errors
        // alert(error); // Display the error message
        alert("login failed"); // Display the error message
      });
  };

  return (
    <div className="w-1/2 mx-auto">
      <form>
        <h1 className="text-3xl my-5 font-bold text-center">Forgot password</h1>
        <div className="mb-4">
          <label className="text-left block text-sm font-medium text-gray-700">
            User email:
          </label>
          <input
            type="text"
            placeholder="Enter user email"
            className="mt-1 p-2 w-full rounded-md border border-gray-300"
            name="forgotemail"
            value={forgotemail}
            onChange={(e) => setforgotEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={submitHandler}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
export default ForgotpasswordComponent;
