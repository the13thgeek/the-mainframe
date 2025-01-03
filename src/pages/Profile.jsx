import React, { useState, useEffect } from "react";
import Tile from "../components/Tile";
import Modal from "../components/Modal";
import PlayerStats from "../components/PlayerStats";
import PlayerAchievements from "../components/PlayerAchievements";
import { getUserFromStorage, saveUserToStorage } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../utils/common";
import './Profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const user = getUserFromStorage();
  const [userCards,setUserCards] = useState(user?.user_cards);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const userCardsEX = userCards?.filter(card =>
    ['EX','GX','SP'].some(option => card.catalog_no.startsWith(option))
  );
  const userCardsRP = userCards?.filter(card =>
    ['RP'].some(option => card.catalog_no.startsWith(option))
  );
  const userCardsRG = userCards?.filter(card =>
    ['RG'].some(option => card.catalog_no.startsWith(option))
  );
  
  const openDialog = (status, message) => {
    setModalContent(
      <>
        <div className="icon">
          {status ? (
            <i className="fa-solid fa-circle-check"></i>
          ) : (
            <i className="fa-solid fa-circle-xmark"></i>
          )}
        </div>
        <div className="message">
          <p>{message}</p>
        </div>
      </>
    );
    setModalOpen(true);
  }

  const closeDialog = () => {
    setModalOpen(false);
  };

  const changeCard = async (userId, cardId) => {
    const requestCloud = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/change-card-site`, {
      method: "POST",
      headers: {
          "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        card_id: cardId
      })
    });
    const data = await requestCloud.json();    

    if(data.status) {
      let newUserData = user;
      let newActiveCard = null;
      let newCardSet = [];

      for(let card of user.user_cards) {
        if(card.card_id == cardId) {
          newActiveCard = card;
          card.is_default = 1;
        } else {
          card.is_default = 0;
        }
        newCardSet.push(card);
      }
      newUserData.user_card = newActiveCard;
      newUserData.user_cards = newCardSet;
      saveUserToStorage(newUserData);
      setUserCards(newCardSet);
    }
    openDialog(data.status, data.message);
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="layout-row">
      <div className="col-a">
        {/* <Tile extraClassName={'profile'}>
          <TwitchUserInfo />
        </Tile> */}
        <Tile extraClassName={'card-collection'} icon={<i className="fa-solid fa-credit-card"></i>} title={'Member Card Collection'}>
          {/* Special Cards */}
          <h3 className="card-category">Specials &amp; Exclusives</h3>
          <div className="card-list">
            {userCardsEX.length > 0 && userCardsEX.map((card,idx) => (
              <div className={'card-item' + (card.is_default === 1 ? (` active`) : (''))} key={idx}>
                <img src={UserCard(card.sysname + "-thumb")} alt={card.name} />
                <div className="info">
                  <p className="title">{card.name}</p>
                  <div className="badges">
                    {card.is_premium === 1 && (
                      <span className="card-badge premium">Premium</span>
                    )}
                    {card.is_event === 1 && (
                      <span className="card-badge event">Event Exclusive</span>
                    )}
                    {card.is_rare === 1 && (
                      <span className="card-badge rare">Rare</span>
                    )}
                  </div>
                  <p className="notes">{card?.notes}</p>
                </div>  
                <div className="card-actions">
                  {card.is_default !== 1 ? (
                    <button className="set-active" onClick={() => changeCard(user.local_id,card.card_id)}>Set Active</button>
                  ) : (
                    <span>Active</span>
                  )}
                </div>              
              </div>
            ))}
          </div>
          {/* Premium Cards */}
          <h3 className="card-category">Premium Issue</h3>
          <div className="card-list">
            {userCardsRP.length > 0 && userCardsRP.map((card,idx) => (
              <div className={'card-item' + (card.is_default === 1 ? (` active`) : (''))} key={idx}>
                <img src={UserCard(card.sysname + "-thumb")} alt={card.name} />
                <div className="info">
                  { card.is_default === 1 && (
                    <div className="card-active-indicator">Active</div>
                  ) }
                  <p className="title">{card.name}</p>
                  <div className="badges">
                    {card.is_premium === 1 && (
                      <span className="card-badge premium">Premium</span>
                    )}
                    {card.is_event === 1 && (
                      <span className="card-badge event">Event Exclusive</span>
                    )}
                    {card.is_rare === 1 && (
                      <span className="card-badge rare">Rare</span>
                    )}
                  </div>
                  <div className="card-actions">
                    {card.is_default !== 1 && (
                      <button className="set-active" onClick={() => changeCard(user.local_id,card.card_id)}>Set Active</button>
                    )}
                  </div>
                </div>                
              </div>
            ))}
          </div>
          {/* Standard Cards */}
          <h3 className="card-category">Standard Issue</h3>
          <div className="card-list">
            {userCardsRG.length > 0 && userCardsRG.map((card,idx) => (
              <div className={'card-item' + (card.is_default === 1 ? (` active`) : (''))} key={idx}>
                <img src={UserCard(card.sysname + "-thumb")} alt={card.name} />
                <div className="info">
                  { card.is_default === 1 && (
                    <div className="card-active-indicator">Active</div>
                  ) }
                  <p className="title">{card.name}</p>
                  <div className="badges">
                    {card.is_premium === 1 && (
                      <span className="card-badge premium">Premium</span>
                    )}
                    {card.is_event === 1 && (
                      <span className="card-badge event">Event Exclusive</span>
                    )}
                    {card.is_rare === 1 && (
                      <span className="card-badge rare">Rare</span>
                    )}
                  </div>
                  <div className="card-actions">
                    {card.is_default !== 1 && (
                      <button className="set-active" onClick={() => changeCard(user.local_id,card.card_id)}>Set Active</button>
                    )}
                  </div>
                </div>                
              </div>
            ))}
          </div>
        </Tile>
      </div>
      <div className="col-b">
        <Tile extraClassName={'stats'} icon={<i className="fa-solid fa-chart-pie"></i>} title={'Player Statistics'}>
            <PlayerStats userStats={user.stats} userLevel={user.level} />
        </Tile>
        <Tile extraClassName={'achievements'} icon={<i className="fa-solid fa-medal"></i>} title={'Achievements'}>
            <PlayerAchievements achievementsList={user.achievements} />
        </Tile>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => closeDialog()} footer={<button onClick={closeDialog}>OK</button>}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Profile;