import React, { useState, useEffect } from 'react';
import { getUserFromStorage } from "../utils/auth";
import ExpProgressBar from './ExpProgressBar';
import PlayerStats from './PlayerStats';
import PlayerAchievements from './PlayerAchievements';
import { UserCard } from '../utils/common';
import './DialogUserPreview.scss';

const DialogUserPreview = ({ userId }) => {
  if(!userId) return null;
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const currentUser = getUserFromStorage();

  useEffect(() => {
    const fetchUserProfile = async()  => {  
      try {
        const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/user-profile`,
          {
            method: 'POST',
            headers: {
              "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_id: userId
            })
          });
        if(response) {
          const result = await response.json();
          setUserData(result);
          setLoading(false);
        }
      } catch(e) {
        console.log('[User Profile] Error: ' + e.message);
      }
    };

    fetchUserProfile();
  },[]);

  return (
    <div className='user-profile-preview'>
      { isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="content-row">
          <div className="level-info">
            <div className={'avatar user-level-bg level-'+userData.level}>
              {userData.twitch_avatar ? (
                <img src={userData.twitch_avatar} alt="Twitch Avatar" />
              ) : (
                <div className="icon">
                  <i className={'fa-solid fa-user user-level level-'+userData.level}></i>
                </div>
              )}
            </div>
            <ExpProgressBar level={userData.level} progress={userData.levelProgress} />
            <p>
              <span className="level">Level {userData.level}</span><br />
              <span className={'title user-level-bg level-'+userData.level}>{userData.title}</span>
            </p>            
          </div>  
          <div className="contents">
            <div className="card-box">
              <img src={UserCard(userData.card_default.sysname)} alt={`Card: ${userData.card_default.name}`} />
              <h3 className='twitch-username'>{userData.twitch_display_name}</h3>            
              <div className="level">{userData.level}</div>
            </div>
          </div>
        </div>
        
          {currentUser.local_id === 1 && (
            <div className="content-row">
              <PlayerStats userStats={userData.stats} userLevel={userData.level} />
              </div>
          )}
        <div className="content-row">
          <PlayerAchievements achievementsList={userData.achievements} />
        </div>
        </>
      ) }    
    </div>
  )
}

export default DialogUserPreview