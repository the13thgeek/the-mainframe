import React from 'react';
import './PlayerAchievements.scss'

const PlayerAchivements = ({ achievementsList = null }) => {

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York', // Convert to EST time zone
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formatter.format(date);
  }

  return (
    <div className='achievements-content'>
      {achievementsList && achievementsList.length > 0 ? (
        <ul>
          {achievementsList.map((achievement,idx) => (
            <li key={idx}>
              <div className="icon">
                <i className={'fa-solid fa-medal tier-'+achievement.achievement_tier.toLowerCase()}></i>
              </div>
              <div className="details">
                <h4 className='achievement-name'>{achievement.achievement_name} <small>(Tier {achievement.achievement_tier})</small></h4>
                <p className="details">{achievement.description}</p>
                <p className="date">{formatDateString(achievement.achieved_at)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No achievement badges... yet!</p>
      )}
    </div>
  )
}

export default PlayerAchivements