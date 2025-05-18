import React from 'react';
import ExpProgressBar from './ExpProgressBar';
import { Link } from 'react-router-dom';
import { UserCard, getTierName } from '../utils/common';
import { getAuthUrl, getUserFromStorage, clearUserFromStorage } from "../utils/auth";
import PlayerBadge from './PlayerBadge';
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
        <>
        {user ? (
            <div className={'profile-detail'}>
                <div className="card-bg">
                    <img src={UserCard(user.user_card.sysname)} alt={`Card: ${user.user_card.name}`} />
                </div>
                <div className="user-card">
                    <div className="avatar">
                        <img src={user.profile_image_url} alt="Twitch Avatar" />
                    </div>
                    <div className="contents">
                        <div className="row stats">
                            <div className="user-stats">
                                <h3 className='twitch-username'>{user.display_name}</h3>
                                {/* <UsernameDisplay userName={user.twitch_display_name} subMonths={user.sub_months} /> */}
                                <div className="badges">
                                    { getTierName(user.sub_months) !== null && (<PlayerBadge badgeName={getTierName(user.sub_months)} />) }
                                    { user.team !== null && (<PlayerBadge badgeName={user.team?.toLowerCase()} />) }
                                    { user.is_premium === 1 && (<PlayerBadge badgeName='elite' />) }
                                </div>                                
                                <span className="level"><i className="fa-solid fa-trophy"></i> Level {user.level}</span> <span className={'title user-level-bg level-'+user.level}>{user.title}</span>
                            </div>
                        </div>
                        <div className="row exp">
                            <div className="user-exp">
                                <span className="exp">{Math.ceil(user.exp).toLocaleString('en-US')} EXP</span>
                            </div>
                            <ExpProgressBar level={user.level} progress={user.level_progress} />
                        </div>
                    </div>
                </div>
                <div className="toolbar">
                    <button className='sign-out' onClick={handleLogout}>Logout <i className="fa-solid fa-right-from-bracket"></i></button>
                </div>                 
            </div>
        ) : (
            <>
            <div className="invite">
                <div className="login-frame">
                    <button className='sign-in' onClick={() => (window.location.href = getAuthUrl())}><i className="fa-brands fa-twitch"></i> Mainframe Login</button>
                    <p>Login with your Twitch account.</p>
                    {/* <p className="misc-links">
                        <a href="https://twitch.tv/the13thgeek/" target='blank'>
                            @the13thgeek Channel <i className="fa-solid fa-chevron-right"></i>
                        </a>
                        <a href="https://twitch.tv/the13thgeek/" target='blank'>
                            Twitch Home <i className="fa-solid fa-chevron-right"></i>
                        </a>
                    </p> */}
                </div>
                <div className="toolbar-invite">
                    <Link to='/privacy-policy'>Privacy Policy &gt;</Link>
                </div>    
            </div>
            
            </>          
        )}
        </>
    );
};

export default TwitchUserInfo