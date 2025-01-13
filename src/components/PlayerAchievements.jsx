import React from 'react';
import './PlayerAchievements.scss'

const PlayerAchievements = ({ achievementsList = null, displayFormat = 'grid' }) => {
  
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
    <div className={'achievements-content'}>
      {achievementsList && achievementsList.length > 0 ? (
        <ul className={'achievements-list ' + displayFormat}>
          {achievementsList.map((achievement,idx) => (
            displayFormat === 'grid' ? (
              <li key={idx}>
                <div className={`badge tier-` + achievement.achievement_tier.toLowerCase()}>
                  <img src={`/assets/badges/${achievement.sysname}.png`} alt={achievement.achievement_name} />
                </div>
                <div className="details">
                  <h4 className='achievement-name'>{achievement.achievement_name}</h4>
                  <small>(Tier {achievement.achievement_tier})</small>
                </div>
              </li>
            ) : (
              <li key={idx}>
                <div className={`badge tier-` + achievement.achievement_tier.toLowerCase()}>
                  <img src={`/assets/badges/${achievement.sysname}.png`} alt={achievement.achievement_name} />
                </div>
                <div className="details">
                  <h4 className='achievement-name'>{achievement.achievement_name} <small>(Tier {achievement.achievement_tier})</small></h4>
                  <p className="details">{achievement.description}</p>
                  <p className="date">{formatDateString(achievement.achieved_at)}</p>
                </div>
              </li>
            )              
          ))}
        </ul>
      ) : (
        <p className='no-data'>No achievement badges... yet!</p>
      )}
    </div>
  )
}

export default PlayerAchievements