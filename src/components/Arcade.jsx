import React, { useState, useEffect } from 'react';
import './Arcade.scss';

const Arcade = ({ userId, userName, userAvatar }) => {
  const [playerLives, setPlayerLives] = useState(6);

  return (
    <>
    <div className="game-area">
      <figure>[LOGO HERE]</figure>
      <div className="user-info">
        <img src={userAvatar} alt="" className="avatar" />
        <h4>{userName}</h4>
        <div className="lives">
          { playerLives === 6 ? (<i className="fa-solid fa-battery-full"></i>) : 
            playerLives < 6 && playerLives > 3 ? (<i className="fa-solid fa-battery-three-quarters"></i>) : 
            playerLives === 3 ? (<i className="fa-solid fa-battery-half"></i>) :
            playerLives < 3 && playerLives > 0 ? (<i className="fa-solid fa-battery-quarter"></i>) :
            (<i className="fa-solid fa-battery-empty"></i>)
          } {playerLives}
        </div>
      </div>
      <div className="letter-grid">
        <div className="letter-row">
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
        </div>
        <div className="letter-row">
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
        </div>
        <div className="letter-row">
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
        </div>
        <div className="letter-row">
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
        </div>
        <div className="letter-row">
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
        </div>
        <div className="letter-row">
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
          <div className="item">&nbsp;</div>
        </div>
      </div>
      <form id="main">
        <div className="user-input">
          <input type="text" id="answer" name='answer' placeholder='answer' maxLength={5} />
        </div>
      </form>
    </div>
    <div className="sidebar">
      [SIDEBAR]
      <pre>
        
      </pre>
    </div>
    </>
  )
}

export default Arcade