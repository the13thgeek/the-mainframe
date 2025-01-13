import React from 'react';
import './PlayerStats.scss';

const PlayerStats = ({ userStats = null }) => {
  if (!userStats) return null;
  return (
    <div className={'stats-content'}>
      {!userStats || userStats.length === 0 && (
        <p>Stats data is currently unavailable.</p>
      )}
      <table cellPadding={0} cellSpacing={0} className='stats-table'>
        <thead>
          <tr>
            <th>Statistics</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {userStats?.bean_redeems !== undefined && (
          <tr>
            <td>Beans Redeemed</td>
            <td>{userStats.bean_redeems.toLocaleString('en-US')}</td>
          </tr>
          )}
          {userStats?.points_spend !== undefined && (
            <tr>
              <td>Channel Points Spent</td>
              <td>{userStats.points_spend.toLocaleString('en-US')} PTS</td>
            </tr>
          )}
          {userStats?.card_gacha_pulls !== undefined && (
            <tr>
              <td>Card Gacha Pulls</td>
              <td>{userStats.card_gacha_pulls.toLocaleString('en-US')}</td>
            </tr>
          )}
          {(userStats?.card_gacha_pulls !== undefined && userStats?.card_gacha_pulls_success !== undefined) && (
            <tr>
              <td>Pull Success Rate</td>
              <td>{Math.round((userStats.card_gacha_pulls_success/userStats.card_gacha_pulls)*100,0)}%</td>
            </tr>
          )}
          {userStats?.checkin_count !== undefined && (
            <tr>
              <td>Stream Check-ins</td>
              <td>{userStats.checkin_count.toLocaleString('en-US')}</td>
            </tr>
          )}
          {userStats?.ghost_calls !== undefined && (
            <tr>
              <td>Ghosts Summoned</td>
              <td>{userStats.ghost_calls.toLocaleString('en-US')}</td>
            </tr>
          )}
          {userStats?.redeems_count !== undefined && (
            <tr>
              <td>Channel Point Redeems</td>
              <td>{userStats.redeems_count.toLocaleString('en-US')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerStats