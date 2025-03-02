import React from "react";
import "./components.css"; // Ensure this file exists

const Activity = ({ activities = [] }) => { // Default empty array
    return (
        <ul className="activity-list">
            {activities.slice(0, 10).map((activity, index) => (
                <li key={index}>
                    <p>
                        <strong>{activity?.user || "Unknown User"}</strong> added 
                        <span className="movie-title">{activity?.movie || "Unknown Movie"}</span>{" "}
                        to {activity?.type || "unknown list"} - 
                        <em>{activity?.date || "No Date"}</em>
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default Activity;
