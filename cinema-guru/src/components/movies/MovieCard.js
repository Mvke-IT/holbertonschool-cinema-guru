import React, { useState, useEffect } from 'react';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cinemaImg from '../../assets/cinemaimg.png';
import Image from './Image';

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    const favIcon = <FontAwesomeIcon icon={faStar} />;
    const watchIcon = <FontAwesomeIcon icon={faClock} />;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken || !movie.imdbId) return;

                const headers = { 'Authorization': `Bearer ${accessToken}` };

                console.log("Fetching movie data for:", movie.imdbId);

                const [favoriteResponse, watchLaterResponse] = await Promise.all([
                    axios.get(`http://localhost:8000/api/titles/favorite/`, { headers }),
                    axios.get(`http://localhost:8000/api/titles/watchlater/`, { headers })
                ]);

                const favoriteMovies = favoriteResponse.data;
                const watchLaterMovies = watchLaterResponse.data;

                setIsFavorite(favoriteMovies.some((fav) => fav.imdbId === movie.imdbId));
                setIsWatchLater(watchLaterMovies.some((wl) => wl.imdbId === movie.imdbId));
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        fetchData();
    }, [movie.imdbId]);

    const handleClick = async (type) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) return;

            const headers = { 'Authorization': `Bearer ${accessToken}` };
            const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}/`;

            console.log(`Updating ${type} status for:`, movie.imdbId);

            if (type === 'favorite') {
                setIsFavorite((prev) => !prev);
                await axios[isFavorite ? 'delete' : 'post'](url, {}, { headers });
            } else if (type === 'watchlater') {
                setIsWatchLater((prev) => !prev);
                await axios[isWatchLater ? 'delete' : 'post'](url, {}, { headers });
            }
        } catch (error) {
            console.error(`Error updating ${type} status:`, error);
        }
    };

    return (
        <div className='movieCard'>
            <ul className='movieCardList'>
                <div>
                    <li 
                        style={{ color: isFavorite ? 'red' : 'white' }} 
                        onClick={() => handleClick("favorite")} 
                        className='movieCardIcons'
                    >
                        {favIcon}
                    </li>
                    <li 
                        style={{ color: isWatchLater ? 'red' : 'white' }} 
                        onClick={() => handleClick("watchlater")} 
                        className='movieCardIcons2'
                    >
                        {watchIcon}
                    </li>
                    <li>
                        <Image imageUrl={movie.imageurls[0]} fallBackUrl={cinemaImg} />
                    </li>
                    <li className='movieTitle'>
                        {movie.title}
                    </li>
                </div>
                <li className='movieSynopsis'>
                    {movie.synopsis || 'Not available'}
                </li>
                <ul className='genresContainer'>
                    {movie.genres.map((genre, index) => (
                        <li key={index} className='movieGenre'>{genre}</li>
                    ))}
                </ul>
            </ul>
        </div>
    );
};

export default MovieCard;
