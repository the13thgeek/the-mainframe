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
  const [userNameplates,setUserNameplates] = useState(user?.nameplates || []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const userNameplatesEX = userNameplates?.filter(nameplate =>
    ['EX','GX','SP'].some(option => nameplate.catalog_no.startsWith(option))
  );
  const userNameplatesRP = userNameplates?.filter(nameplate =>
    ['RP'].some(option => nameplate.catalog_no.startsWith(option))
  );
  const userNameplatesRG = userNameplates?.filter(nameplate =>
    ['RG'].some(option => nameplate.catalog_no.startsWith(option))
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

  const changeNameplate = async (userId, userName, nameplateName) => {
    const requestCloud = await fetch(`${import.meta.env.VITE_CLOUD_URL}/mainframe/change-nameplate`, {
      method: "POST",
      headers: {
          "x-api-key": import.meta.env.VITE_CLOUD_APIKEY,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        twitch_id: userId,
        twitch_display_name: userName,
        new_nameplate_name: nameplateName
      })
    });
    const data = await requestCloud.json();    

    if(data.success) {
      let newUserData = user;
      let newActiveNameplate = null;
      let newNameplateSet = [];

      for(let nameplate of user.nameplates) {
        if(nameplate.sysname == nameplateName) {
          newActiveNameplate = nameplate;
          nameplate.is_equipped = 1;
        } else {
          nameplate.is_equipped = 0;
        }
        newNameplateSet.push(nameplate);
      }
      newUserData.equipped.nameplate = newActiveNameplate;
      newUserData.nameplates = newNameplateSet;
      saveUserToStorage(newUserData);
      setUserNameplates(newNameplateSet);
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
                    <img src={UserCard(user.equipped.nameplate.sysname)} alt={`Card: ${user.equipped.nameplate.name}`} />
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
                {userNameplatesEX.length > 0 && userNameplatesEX.map((nameplate,idx) => (
                  <div className={'card-item' + (nameplate.is_equipped === 1 ? (` active`) : (''))} key={idx}>
                    <img src={UserCard(nameplate.sysname + "-thumb")} alt={nameplate.name} />
                    <div className="info">
                      <p className="title">{nameplate.name}</p>
                      <div className="badges">
                        {nameplate.is_premium === 1 && (
                          <span className="card-badge premium">Premium</span>
                        )}
                        {nameplate.is_event === 1 && (
                          <span className="card-badge event">Event Exclusive</span>
                        )}
                        {nameplate.is_rare === 1 && (
                          <span className="card-badge rare">Rare</span>
                        )}
                      </div>
                    </div>  
                    <div className="card-actions">
                      {nameplate.is_equipped !== 1 ? (
                        <button className="set-active" onClick={() => changeNameplate(user.twitch_id,user.twitch_display_name,nameplate.sysname)}>Set Active</button>
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
                {userNameplatesRP.length > 0 && userNameplatesRP.map((nameplate,idx) => (
                  <div className={'card-item' + (nameplate.is_equipped === 1 ? (` active`) : (''))} key={idx}>
                    <img src={UserCard(nameplate.sysname + "-thumb")} alt={nameplate.name} />
                    <div className="info">
                      <p className="title">{nameplate.name}</p>
                      <div className="badges">
                        {nameplate.is_premium === 1 && (
                          <span className="card-badge premium">Premium</span>
                        )}
                        {nameplate.is_event === 1 && (
                          <span className="card-badge event">Event Exclusive</span>
                        )}
                        {nameplate.is_rare === 1 && (
                          <span className="card-badge rare">Rare</span>
                        )}
                      </div>
                    </div>  
                    <div className="card-actions">
                      {nameplate.is_equipped !== 1 ? (
                        <button className="set-active" onClick={() => changeNameplate(user.twitch_id,user.twitch_display_name,nameplate.sysname)}>Set Active</button>
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
                {userNameplatesRG.length > 0 && userNameplatesRG.map((nameplate,idx) => (
                  <div className={'card-item' + (nameplate.is_equipped === 1 ? (` active`) : (''))} key={idx}>
                    <img src={UserCard(nameplate.sysname + "-thumb")} alt={nameplate.name} />
                    <div className="info">
                      <p className="title">{nameplate.name}</p>
                      <div className="badges">
                        {nameplate.is_premium === 1 && (
                          <span className="card-badge premium">Premium</span>
                        )}
                        {nameplate.is_event === 1 && (
                          <span className="card-badge event">Event Exclusive</span>
                        )}
                        {nameplate.is_rare === 1 && (
                          <span className="card-badge rare">Rare</span>
                        )}
                      </div>
                    </div>  
                    <div className="card-actions">
                      {nameplate.is_equipped !== 1 ? (
                        <button className="set-active" onClick={() => changeNameplate(user.twitch_id,user.twitch_display_name,nameplate.sysname)}>Set Active</button>
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