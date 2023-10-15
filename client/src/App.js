import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./Helpers/AuthContext";
import axios from "axios";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import AddArtwork from "./pages/AddArtwork";
import Message from "./pages/Message";
import Payment from "./pages/Payment";
// import ChangePwd from "./pages/ChangePwd";
import { AuthProvider } from "./Helpers/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";

//fix me: footer cover the register button
import Artwork from "./pages/ArtworkList";
import MyArtwork from "./pages/MyArtwork";
import "./App.css";

function App() {
  // const [authStatus, setAuthStatus] = useState({
  //   username: "",
  //   email: "",
  //   _id: 0,
  //   status: false,
  // });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/users/auth", {
  //       headers: {
  //         accessToken: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.error)
  //         setAuthStatus({
  //           ...authStatus,
  //           status: false,
  //         });
  //       else {
  //         setAuthStatus({
  //           username: res.data.username,
  //           email: res.data.email,
  //           _id: res.data._id,
  //           status: true,
  //         });
  //       }
  //     });
  // }, []);

  return (
    <AuthProvider>
      <div className="page-container">
        {/* <AuthContext.Provider value={{ authStatus, setAuthStatus }}> */}
        <Router>
          <HeaderComponent />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/message" element={<Message />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/addArtwork" element={<AddArtwork />} />
            {/* <Route path="/changepwd" element={<ChangePwd />} /> */}
            <Route path="/artwork/:userId" element={<MyArtwork />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
          <FooterComponent />
        </Router>
        {/* </AuthContext.Provider> */}
      </div>
    </AuthProvider>
  );
}

export default App;
