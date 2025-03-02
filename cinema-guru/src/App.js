import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Authentication from "./routes/auth/Authentication";
import Dashboard from "./routes/dashboard/Dashboard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUsername, setUserUsername] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            axios
                .post("http://localhost:8000/api/auth/", {}, { headers: { Authorization: `Bearer ${accessToken}` } })
                .then((response) => {
                    setIsLoggedIn(true);
                    setUserUsername(response.data.username);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                });
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/*" element={<Dashboard userUsername={userUsername} setUserUsername={setUserUsername} setIsLoggedIn={setIsLoggedIn} />} />
                ) : (
                    <Route path="/*" element={<Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
