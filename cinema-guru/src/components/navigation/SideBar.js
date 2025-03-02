import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components.css";
import "./navigation.css";
import Activity from "../Activity";

const SideBar = () => {
    const [selected, setSelected] = useState("home");
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/activity")
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error("Error fetching activities:", error);
            });
    }, []);

    const setPage = (pageName) => {
        setSelected(pageName);
        navigate(`/${pageName}`);
        if (pageName !== "activity") {
            setShowActivities(false);
        }
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Sidebar Overlay */}
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>

            <nav className={`sidebar ${isOpen ? "open" : ""}`}>
                <ul className="sidebar-list">
                    <li onClick={() => setPage("home")} className={selected === "home" ? "selected" : ""}>
                        <span className="icon">🏠</span> Home
                    </li>
                    <li onClick={() => setPage("favorites")} className={selected === "favorites" ? "selected" : ""}>
                        <span className="icon">⭐</span> Favorites
                    </li>
                    <li onClick={() => setPage("watchlater")} className={selected === "watchlater" ? "selected" : ""}>
                        <span className="icon">🕒</span> Watch Later
                    </li>
                    <li onClick={() => setPage("activity")} className={selected === "activity" ? "selected" : ""}>
                        <span className="icon">📋</span> Activity
                    </li>
                </ul>

                {showActivities && (
                    <ul className="activity-list">
                        {activities.slice(0, 10).map((activity, index) => (
                            <Activity key={index} activity={activity} />
                        ))}
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default SideBar;
