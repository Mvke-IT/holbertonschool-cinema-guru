import React from "react";
import "./movies.css";
import Tag from "./Tag";

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {
    const genreList = ["Action", "Drama", "Comedy", "Biography", "Romance", "Thriller", "War", "History", "Sport", "Sci-Fi", "Documentary", "Crime", "Fantasy"];

    console.log("Current Genres Selected:", genres);

    return (
        <div className="filter">
            <input 
                type="text" 
                placeholder="Search Movies" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Min Year" 
                value={minYear} 
                onChange={(e) => setMinYear(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Max Year" 
                value={maxYear} 
                onChange={(e) => setMaxYear(e.target.value)}
            />

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="highestRated">Highest Rated</option>
                <option value="lowestRated">Lowest Rated</option>
            </select>

            <ul className="genre-tags">
                {genreList.map((genre, index) => (
                    <Tag key={index} genre={genre} genres={genres} setGenres={setGenres} />
                ))}
            </ul>
        </div>
    );
};

export default Filter;
