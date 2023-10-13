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
//fix me: footer cover the register button
import Artwork from "./pages/ArtworkList";
import "./App.css";

function App() {
  const [authStatus, setAuthStatus] = useState({
    username: "",
    email: "",
    _id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error)
          setAuthStatus({
            ...authStatus,
            status: false,
          });
        else {
          setAuthStatus({
            username: res.data.username,
            email: res.data.email,
            _id: res.data._id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="page-container">
      <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
        <Router>
          <HeaderComponent />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/message" element={<Message />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/addArtwork" element={<AddArtwork />} />
          </Routes>
          <FooterComponent />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
