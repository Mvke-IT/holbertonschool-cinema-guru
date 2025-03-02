import React, { useState } from "react";
import "./movies.css"; 

const Tag = ({ genre, genres, setGenres }) => {
    const [selected, setSelected] = useState(genres.includes(genre));

    const handleTag = () => {
        if (selected) {
            setGenres(genres.filter(g => g !== genre)); // Remove genre
        } else {
            setGenres([...genres, genre]); // Add genre
        }
        setSelected(!selected);
    };

    return (
        <li className={`tag ${selected ? "selected" : ""}`} onClick={handleTag}>
            {genre}
        </li>
    );
};

export default Tag;
