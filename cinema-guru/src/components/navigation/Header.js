import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navigation.css';

export default function Header({ userUsername, setUserUsername, setIsLoggedIn }) {
    return (
        <nav className="navbar">
            <ul>
                <li className="title">
                    <p id="left">Cinema Guru</p>
                </li>
                <li className="picAndName">
                    <img src="https://picsum.photos/100/100" alt="User Avatar" />
                    <p>Welcome, {userUsername}</p>
                </li>
                <li>
                    <span className="logout" onClick={() => {
                        localStorage.removeItem("accessToken"); // ✅ Remove token
                        setUserUsername(""); // ✅ Clear username
                        setIsLoggedIn(false); // ✅ Log out user
                        console.log(`Logout ${userUsername}`);
                    }} >
                        <FontAwesomeIcon icon="sign-out-alt" />
                        <p>Logout</p>
                    </span>
                </li>
            </ul>
        </nav>
    );
}
