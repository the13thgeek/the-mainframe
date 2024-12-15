import React, { useState, useEffect } from 'react';
import './Ranking.scss';
import Modal from "../components/Modal";
import DialogUserPreview from './DialogUserPreview';

const Ranking = ({ rankType = null, itemsToShow = 5, valueLabels = null, enableUserView = false }) => {
  const [rankData, setRankData] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  if(!rankType) return(null);

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
      {!rankData && (
        <p>Ranking data is currently unavailable.</p>
      )}
      {rankData && rankData.map((rankItem,idx) => (
        <div className={'row' + (enableUserView ? ' clickable' : '')} key={idx} onClick={() => openUserInfo(enableUserView ? rankItem.id : null)}>
          <div className="rank">#{idx+1}</div>
          <div className="icon">
            {rankItem.twitch_avatar ? (
              <div className={'avatar user-level-bg level-'+rankItem.level}>
                <img src={rankItem.twitch_avatar} alt="Avatar" />
              </div>
            ) : (
              <i className={'fa-solid fa-user user-level level-'+rankItem.level}></i>
            )}
            
          </div>
          <div className="player">
            <h4>{rankItem.twitch_display_name}</h4>
            <div className="data"><span className="level">Lvl {rankItem.level}</span> <span className={'title user-level level-'+rankItem.level}>{rankItem.title}</span></div>
          </div>
          {valueLabels && (
            <div className="points">
              <span className={'user-level level-'+rankItem.level}>{Math.ceil(rankItem.value)}</span>
              <span className="value-label">{valueLabels}</span>
            </div>
          )}
        </div>
      ))}
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      {modalContent}
    </Modal>
    </>
  )
}

export default Ranking