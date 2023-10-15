import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddArtwork from "./pages/AddArtwork";
import Message from "./pages/Message";
import Payment from "./pages/Payment";
import ChangePwd from "./pages/ChangePwd";
import { AuthProvider } from './Helpers/AuthContext';
//fix me: footer cover the register button
import Artwork from "./pages/ArtworkList";
import MyArtwork from "./pages/MyArtwork";
import "./App.css";

function App() {

  return (
    <AuthProvider>
      <div className="page-container">
        <Router>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/message" element={<Message />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/artwork" element={<Artwork />} />
            <Route path="/addArtwork" element={<AddArtwork />} />
            <Route path="/changepwd" element={<ChangePwd />} />
            <Route path="/artwork/:userId" element={<MyArtwork />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
