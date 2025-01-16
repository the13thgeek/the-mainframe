import React, { useEffect, useRef } from 'react';
import Tile from '../components/Tile';
import { Application, Graphics, Text, TextStyle, Container, Sprite } from "pixi.js";
import './Games.scss';

const GameLoader = ({ loadGame }) => {  
  const pixiContainer = useRef(null);

  useEffect(() => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    app.init({ background: "#1099bb", width: 600, height: 600 });
    pixiContainer.current.appendChild(app.canvas);

    const cleanup = loadGame(app);

    return () => {
      if (typeof cleanup !== "function") cleanup();
      app.destroy(true,true);
    };
  },[loadGame]);

  return (
    <main className="page-games">
      <div className="structure">
        <div className="row">
          <div className="col-a">
            <Tile extraClassName={'games-list'} title={'Games'}>
              <p>GAME</p>
              <div ref={pixiContainer}>
              </div>
            </Tile>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GameLoader