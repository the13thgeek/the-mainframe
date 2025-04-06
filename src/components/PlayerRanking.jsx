import { useState, useEffect } from 'react';
import { UserCard } from '../utils/common';
import Modal from "../components/Modal";
import DialogUserPreview from './DialogUserPreview';

import './PlayerRanking.scss';

const PlayerRanking = ({ enableUserView = false }) => {
  const [rankData, setRankData] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
              rank_type: "exp", items_to_show: 5
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
    <ol className="top-players">
      { rankData && rankData.length > 0 && rankData.map((user, idx) => (
        <li key={idx} className={'rank-item' + (enableUserView ? ' clickable' : '') + ' user-level-bg level-'+(user.level)} onClick={() => openUserInfo(enableUserView ? user.id : null)}>
          <div className="card">
            <img src={UserCard(user.sysname+'-thumb')} alt={`Card: ${user.active_card}`} />
            <div className="avatar">
              <img src={user.twitch_avatar} alt={user.twitch_display_name + `'s avatar`} />
            </div>
          </div>
          <p className='player-name'>{user.twitch_display_name}</p>
          {user.is_premium === 1 && (<div className='player-premium'><div className="badge"><span>Mode Élite</span></div></div>)}
          <p className='player-level'>
            <span className="level">Lvl {user.level}</span>
            <span className='title'>{user.title}</span>
          </p>
        </li>
      ))}      
    </ol>
    <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
      {modalContent}
    </Modal>
    </>
  )
}

export default PlayerRanking