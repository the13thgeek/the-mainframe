import React from 'react';
import ExpProgressBar from './ExpProgressBar';
import { getAuthUrl, getUserFromStorage, clearUserFromStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import './TwitchUserInfo.scss';

const TwitchUserInfo = () => {
    const navigate = useNavigate();
    const user = getUserFromStorage();
    const handleLogout = () => {
        clearUserFromStorage();
        navigate("/");
        window.location.reload(); // Ensures state resets globally
    };

    return (
        <div className='profile-detail'>
            {user ? (
                <div className="row">
                    <div className="avatar">
                        <img src={user.profile_image_url} alt="Twitch Avatar" />
                    </div>
                    <div className="contents">
                        <div className="row stats">
                            <div className="user-stats">
                                <h3 className='twitch-username'>{user.display_name}</h3>
                                <span className="level"><i className="fa-solid fa-trophy"></i> Level {user.level}</span> <span className={'title user-level-bg level-'+user.level}>{user.title}</span>
                            </div>
                            <button className='sign-out' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
                        </div>
                        <div className="row exp">
                            <div className="user-exp">
                                <span className="exp">{Math.ceil(user.exp)} EXP</span>
                            </div>
                            <ExpProgressBar level={user.level} progress={user.level_progress} />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="invite">
                        <h3>Your Profile</h3>
                        <p>Connect with Twitch to unlock personalized stream features, exclusive perks and fun off-stream community activities!</p>
                        <button className='sign-in' onClick={() => (window.location.href = getAuthUrl())}><i className="fa-brands fa-twitch"></i> Login with Twitch</button>
                    </div>
                </>
                
            )}
        </div>
    );
};

export default TwitchUserInfo