import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./dashboard.css";
import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";

const Dashboard = ({ userUsername, setUserUsername, setIsLoggedIn }) => {
    return (
        <div className="dashboard">
            <Header userUsername={userUsername} setUserUsername={setUserUsername} setIsLoggedIn={setIsLoggedIn} />
            <div className="dashboard-layout">
                <SideBar />
                <div className="dashboard-content">
                    {/* Define the Routes */}
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/watchlater" element={<WatchLater />} />
                        {/* Redirect all other routes to /home */}
                        <Route path="*" element={<Navigate to="/home" />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
