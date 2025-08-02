import React, { useState, useEffect } from 'react';
import './Ranking.scss';
import { getTierName } from '../utils/common';
import Modal from "../components/Modal";
import UsernameDisplay from './UsernameDisplay';
import PlayerBadge from './PlayerBadge';
import DialogUserPreview from './DialogUserPreview';

const Ranking = ({ rankType = null, itemsToShow = 5, valueLabels = null, enableUserView = false }) => {
  const [rankData, setRankData] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  //if(!rankType) return(null);

  const openUserInfo = (userId) => {
    if(userId) {
      setModalContent(
        <DialogUserPreview userId={userId} />
      );
      setModalOpen(true);
    } else {
      return false;
    }  
  }
  
  useEffect(() => {
    const fetchRanking = async()  => {  
      try {
        const response = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/ranking`,
          {
            method: 'POST',
            headers: {
              "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              rank_type: rankType, items_to_show: itemsToShow
            })
          });
        if(response) {
          const result = await response.json();
          setRankData(result);
        }
      } catch(e) {
        console.log('[Ranking] Error: ' + e.message);
      }
    };

    fetchRanking();

  },[]);

  return (
    <>
    <div className="grid-ranking">
      {!rankData || rankData.length === 0 && (
        <p>Ranking data is currently unavailable.</p>
      )}
      <ol className="ranking">
      {rankData && rankData.map((user,idx) => (   

        <li key={idx} className={'rank-item' + (enableUserView ? ' clickable' : '')} onClick={() => openUserInfo(enableUserView ? user.id : null)}>
          { rankType === 'spender' ? (
            <>
            <div className={'avatar user-level-bg level-'+user.level}>
              <img src={user.twitch_avatar} alt="Avatar" />
            </div>
            <div className="user-info">
              {/* <p className='username'>{user.twitch_display_name}</p> */}
              <UsernameDisplay userName={user.twitch_display_name} subMonths={user.sub_months} />
              <div className="badges">
                { getTierName(user.sub_months) !== null && (<PlayerBadge badgeName={getTierName(user.sub_months)} short={true} />) }
                {/* { user.team !== null && (<PlayerBadge badgeName={user.team?.toLowerCase()} short={true} />) } */}
                { user.is_premium === 1 && (<PlayerBadge badgeName='elite' short={true} />) }
              </div>
              <p className="level">Lvl {user.level} <span className={'title user-level-bg level-'+user.level}>{user.title}</span></p>
              { valueLabels && (
              <p className='data'><b>{ !isNaN(user.value) ? Math.ceil(user.value).toLocaleString('en-US') : user.value}</b> {valueLabels}</p>
              )}            
            </div>
            </>
          ) : rankType === 'checkins_last' ? (
            <>
            <div className={'avatar user-level-bg level-'+user.level}>
              <img src={user.twitch_avatar} alt="Avatar" />
            </div>
            <div className="user-info">
              {/* <p className='username'>{user.twitch_display_name}</p> */}
              <UsernameDisplay userName={user.twitch_display_name} subMonths={user.sub_months} />
              <div className="badges">
                { getTierName(user.sub_months) !== null && (<PlayerBadge badgeName={getTierName(user.sub_months)} short={true} />) }
                {/* { user.team !== null && (<PlayerBadge badgeName={user.team?.toLowerCase()} short={true} />) } */}
                { user.is_premium === 1 && (<PlayerBadge badgeName='elite' short={true} />) }
              </div>
              <p className="level">Lvl {user.level} <span className={'title user-level-bg level-'+user.level}>{user.title}</span></p>
            </div>
            </>
          ) : rankType === 'achievements' ? (
            <>
            <div className={'achievement-badge tier-'+user.tier.toLowerCase()}>
              <img src={'/assets/badges/' + user.ach_sysname + '.png'} alt={user.ach_name} />
            </div>
            <div className="user-info">
              {/* <p className='username'>{user.twitch_display_name}</p> */}
              <UsernameDisplay userName={user.twitch_display_name} subMonths={user.sub_months} />
              <div className="badges">
                { getTierName(user.sub_months) !== null && (<PlayerBadge badgeName={getTierName(user.sub_months)} short={true} />) }
                {/* { user.team !== null && (<PlayerBadge badgeName={user.team?.toLowerCase()} short={true} />) } */}
                { user.is_premium === 1 && (<PlayerBadge badgeName='elite' short={true} />) }
              </div>
              <p className="level">Lvl {user.level} <span className={'title user-level-bg level-'+user.level}>{user.title}</span></p>
              <p className='achievement'>earned <b>{user.ach_name} (Tier {user.tier})</b></p>
            </div>
            </>
          ) : (
            <>
            <div className={'avatar user-level-bg level-'+user.level}>
              <img src={user.twitch_avatar} alt="Avatar" />
            </div>
            <div className="user-info">
              <p className='username'>{user.twitch_display_name}</p>
              <div className="badges">
                {/* {user.team !== null && (<div className={`badge-item team-`+user.team?.toLowerCase()}><span>{user.team}</span></div>)} */}
                {user.is_premium === 1 && (<div className="badge-item mode-elite"><span>Mode Élite</span></div>)}
              </div>
              <p className="level">Lvl {user.level} <span className={'title user-level-bg level-'+user.level}>{user.title}</span></p>
              { valueLabels && (
              <p className='data'><b>{ !isNaN(user.value) ? Math.ceil(user.value).toLocaleString('en-US') : user.value}</b> {valueLabels}</p>
              )}            
            </div>
            </>
          )}
          
        </li>
        
      ) 


      )}  
      </ol>      
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      {modalContent}
    </Modal>
    </>
  )
}

export default Ranking