import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./Helpers/AuthContext";
import axios from "axios";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Message from "./pages/Message";
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
      .get("http://localhost:3001/api/users/", {
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
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/message" element={<Message />} />
            <Route path="/artwork" element={<Artwork />} />
          </Routes>
          {/* <FooterComponent /> */}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
