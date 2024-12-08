import React, { useEffect } from "react";
import TwitchUserInfo from "../components/TwitchUserInfo";
import { getUserFromStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const user = getUserFromStorage();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div>
            <TwitchUserInfo />
            <h1>Your Twitch Profile</h1>
            <img src={user.profile_image_url} alt="Avatar" />
            <p>Name: {user.display_name}</p>
        </div>
    );
};

export default Profile;