import React from 'react';
import { getAuthUrl, getUserFromStorage, clearUserFromStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const TwitchUserInfo = () => {
    const navigate = useNavigate();
    const user = getUserFromStorage();
    const handleLogout = () => {
        clearUserFromStorage();
        navigate("/");
        window.location.reload(); // Ensures state resets globally
    };

    return (
        <div style={{ padding: "10px", backgroundColor: "#eee", textAlign: "right" }}>
            {user ? (
                <>
                    <img src={user.profile_image_url} alt="Avatar" style={{ width: "40px", borderRadius: "50%" }} />
                    <span>{user.display_name}</span><br />
                    <span>Level {user.level} ({user.title}) [{user.level_progress}%] </span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={() => (window.location.href = getAuthUrl())}>Login to Twitch</button>
            )}
        </div>
    );
};

export default TwitchUserInfo