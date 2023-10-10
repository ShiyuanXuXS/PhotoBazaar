import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Message from './pages/Message';
import HeaderComponent from './components/Header';
import "./App.css";

function App() {
    return (
        <div className="page-container">
            <HeaderComponent />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/message" element={<Message />} />
            </Routes>
        </div>
    )
}

export default App;
