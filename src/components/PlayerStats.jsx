import React from 'react';
import './PlayerStats.scss';

const PlayerStats = ({ userStats = null, userLevel = null }) => {
  if (!userStats || !userLevel) return null;
  return (
    <div className='stats-content'>
      {/* <pre>
        {JSON.stringify(userStats, null, 2)}
      </pre> */}
      <ul>
        {userStats?.bean_redeems !== undefined && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{userStats.bean_redeems}</span>
            <span className="stat-label">Beans</span>
          </li>
        )}
        {userStats?.card_gacha_pulls !== undefined && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{userStats.card_gacha_pulls}</span>
            <span className="stat-label">Gacha Pulls</span>
          </li>
        )}
        {(userStats?.card_gacha_pulls !== undefined && userStats?.card_gacha_pulls_success !== undefined) && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{Math.round((userStats.card_gacha_pulls_success/userStats.card_gacha_pulls)*100,0)}<span className="label">%</span></span>
            <span className="stat-label">Gacha Success Rate</span>
          </li>
        )}
        {userStats?.checkin_count !== undefined && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{userStats.checkin_count}</span>
            <span className="stat-label">Stream Check-ins</span>
          </li>
        )}
        {userStats?.ghost_calls !== undefined && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{userStats.ghost_calls}</span>
            <span className="stat-label">Ghosts Sent</span>
          </li>
        )}
        {userStats?.points_spend !== undefined && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{userStats.points_spend}</span>
            <span className="stat-label">Points Spent</span>
          </li>
        )}
        {userStats?.redeems_count !== undefined && (
          <li>
            <span className={'stat-number user-level level-'+userLevel}>{userStats.redeems_count}</span>
            <span className="stat-label">Total Redeems</span>
          </li>
        )}
      </ul>
    </div>
  )
}

export default PlayerStats