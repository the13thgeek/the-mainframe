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
      <div className={'profile-box user-level-bg level-'+userData.level}>
        <div className='card'>
          <img src={UserCard(userData.card_default.sysname)} alt={`Card: ${userData.card_default.name}`} />
          <div className='avatar'>
            <img src={userData.twitch_avatar} alt="Twitch Avatar" />
          </div>
        </div>
        <h3>{userData.twitch_display_name}</h3>
        <p className="player-level"><span className="level">Lvl {userData.level}</span><span className="title">{userData.title}</span></p>
        {currentUser.local_id === 1 && (
          <PlayerStats userStats={userData.stats} />
        )}
        <PlayerAchievements achievementsList={userData.achievements} displayFormat='grid' />        
      </div>        
      ) }    
    </div>
  )
}

export default DialogUserPreview