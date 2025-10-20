import React, { useState, useEffect } from "react";
import Tile from "../components/Tile";
import Modal from "../components/Modal";
import ExpProgressBar from '../components/ExpProgressBar';
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

  const changeCard = async (userId, userName, cardName) => {
    const requestCloud = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/change-card`, {
      method: "POST",
      headers: {
          "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        twitch_id: userId,
        twitch_display_name: userName,
        new_card_name: cardName
      })
    });
    const data = await requestCloud.json();    

    if(data.success) {
      let newUserData = user;
      let newActiveCard = null;
      let newCardSet = [];

      for(let card of user.user_cards) {
        if(card.sysname == cardName) {
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
    openDialog(data.success, data.message);
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main className="page-profile">
      <div className="structure">
        <div className="row">
          <div className="col-a">
            <Tile extraClassName={'user-profile user-level-bg level-'+user.level} title={'Profile'}>
              <div className="profile-box">
                <div className="profile-left">
                  <div className={'avatar user-level-bg level-'+user.level}>
                    <img src={user.avatar} alt={`${user.display_name}'s Avatar`}/>
                  </div>
                  <ExpProgressBar level={user.level} progress={user.level_progress} />
                  <p>
                    <span className="level">Level {user.level}</span><br />
                    <span className={'title user-level-bg level-'+user.level}>{user.title}</span>
                  </p>
                </div>
                <div className="profile-right">
                  <div className="user-card">
                    <img src={UserCard(user.user_card.sysname)} alt={`Card: ${user.user_card.name}`} />
                    <h3 className="username">{user.display_name}</h3>
                    <span className="level">{user.level}</span>
                  </div>
                </div>
              </div>
            </Tile>
            <Tile extraClassName={'card-collection'} title={'Member Card Collection'}>
              {/* Special Cards */}
              <h3 className="card-category specials">Specials &amp; Exclusives</h3>
              <div className="card-list specials">
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
                    </div>  
                    <div className="card-actions">
                      {card.is_default !== 1 ? (
                        <button className="set-active" onClick={() => changeCard(user.twitch_id,user.twitch_display_name,card.sysname)}>Set Active</button>
                      ) : (
                        <span>Active</span>
                      )}
                    </div>              
                  </div>
                ))}
              </div>
              {/* Premium Cards */}
              <h3 className="card-category premium">Premium Issue</h3>
              <div className="card-list premium">
                {userCardsRP.length > 0 && userCardsRP.map((card,idx) => (
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
                    </div>  
                    <div className="card-actions">
                      {card.is_default !== 1 ? (
                        <button className="set-active" onClick={() => changeCard(user.twitch_id,user.twitch_display_name,card.sysname)}>Set Active</button>
                      ) : (
                        <span>Active</span>
                      )}
                    </div>              
                  </div>
                ))}
              </div>
              {/* Standard Cards */}
              <h3 className="card-category standard">Standard Issue</h3>
              <div className="card-list standard">
                {userCardsRG.length > 0 && userCardsRG.map((card,idx) => (
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
                    </div>  
                    <div className="card-actions">
                      {card.is_default !== 1 ? (
                        <button className="set-active" onClick={() => changeCard(user.twitch_id,user.twitch_display_name,card.sysname)}>Set Active</button>
                      ) : (
                        <span>Active</span>
                      )}
                    </div>              
                  </div>
                ))}
              </div>
            </Tile>
          </div>
          <div className="col-b">
            <Tile extraClassName={'stats'} title={'Player Statistics'}>
              <div className={'wrapper user-level-bg level-' + user.level}>
                <PlayerStats userStats={user.stats} />
              </div>
            </Tile>
            <Tile extraClassName={'achievements'} title={'Achievements'}>
              <div className={'wrapper user-level-bg level-' + user.level}>
                <PlayerAchievements displayFormat='list' achievementsList={user.achievements} />
              </div>
            </Tile>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => closeDialog()} footer={<button onClick={closeDialog}>OK</button>}>
        {modalContent}
      </Modal>
    </main>
  );
};

export default Profile;