import React, { useState, useEffect, useRef } from 'react';
import Tile from '../components/Tile';
import { getUserFromStorage } from "../utils/auth";
import { Application } from "pixi.js";
import './Games.scss';

const GameLoader = ({ loadGame }) => {  
  const user = getUserFromStorage();
  const [gameScore, setGameScore] = useState(0);
  let instanceCounter = 0;
  const pixiContainer = useRef(null);

  const handleScoreUpdate = (score) => {
    // insert score managemebt gere
    setGameScore(score);
  };

  useEffect(() => {
    instanceCounter++;

    if(instanceCounter > 1) {
      return;
    }
    
    // Initialize PIXI
    const app = new Application();
    app
      .init({ 
        background: "#000",
        width: 600,
        height: 450 })
      .then( async () => {
        pixiContainer.current.appendChild(app.canvas);
        const cleanup = loadGame(app, user.display_name, handleScoreUpdate);

        return () => {
          if (typeof cleanup === "function") cleanup();
          app.destroy(true,true);
        };
      });
      
  },[loadGame]);

  return (
    <main className="page-games">
      <div className="structure">
        <div className="row">
          <div className="col-a">
            <Tile extraClassName={'games-list'} title={'Games'}>
              <p>GAME</p>
              <p>Last score: {gameScore}</p>
              <div className='game-screen' ref={pixiContainer}>
              </div>
            </Tile>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GameLoader