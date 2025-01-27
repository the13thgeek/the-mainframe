import React, { useState, useEffect, useRef } from 'react';
import { useTick, Stage, Container, Sprite, Graphics, Text } from "@pixi/react";
import '@pixi/events';
import * as PIXI from "pixi.js";

const AcornBasket = ({ username = 'default' }) => {
  const [screen, setScreen] = useState('title');
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [objects, setObjects] = React.useState([]);
  const basketRef = useRef({ x: 200, width: 100 });
  const gameLoop = useRef(null);
  //const i = useIteration(0.1);

  //const basketTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-acorn.png');
  // const acornTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-acorn.png');
  // const bonusTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-bonus.png');
  // const bombTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-bomb.png'); 

  useEffect(() => {
    console.log('useEffect screen');
    let timer = null;

    if( screen === 'game') {
      console.log(`Screen: ${screen}`);
      // Game timer
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev-1, 0));
      }, 1000);

      // Game Loop
      gameLoop.current = setInterval(() => {
        updateGameObjects();
      }, 16);
    }
    
    return () => {
      clearInterval(timer);
      clearInterval(gameLoop.current);
    };

  },[screen]);

  useEffect(() => {
    if(timeLeft === 0) {
      clearInterval(gameLoop.current);
      console.log('Game Over');
    }
  }, [timeLeft]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") basketRef.current.x -= 30;
      if (e.key === "ArrowRight") basketRef.current.x += 30;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },[]);

  const updateGameObjects = () => {
    setObjects((prev) => 
      prev
        .map((obj) => ({ ...obj, y: obj.y + obj.speed }))
        .filter((obj) => obj.y < 600)
    );
    
    // Collision
    objects.forEach((obj) => {
      const basket = basketRef.current;
      if(
        obj.y > 550 &&
        obj.x > basket.x &&
        obj.x < basket.x + basket.width
      ) {
        switch (obj.type) {
          case "acorn": setScore((prev) => prev++); break;
          case "bonus": setScore((prev) => prev += 3); break;
          case "bomb": setScore((prev) => prev -= 5); break;
        }
        // Remove caught object
        setObjects((prev) => prev.filter((o) => o !== obj))
      }
    });

    if(Math.random() < 0.02) {
      const types = ["acorn", "bonus", "bomb"];
      const type = types[Math.floor(Math.random() * types.length)];
      const speed = type === "bonus" ? 2 : type === "bomb" ? 4 : 3;
      const x = Math.random() * 550;
      setObjects((prev) => [...prev, { x, y: 0, type, speed }]);
    }

  };

  const startGame = (event) => {
    //alert("START");
    console.log('Game Start');
    setScreen('game');
  };

  return (
    <>
    <Stage width={600} height={450} options={{ backgroundColor: 0x000000}}>

      { screen === 'title' && (
        <Container>
          <Text
            text='Acorn Basket'
            anchor={0.5}
            x={300}
            y={150}
            style={{
              align: 'center',
              fill: '0xccff00',
              fontSize: 50,
              letterSpacing: 5
            }}
          />
          <Text
            text={`Hello ${username}!`}
            anchor={0.5}
            x={300}
            y={220}
            style={{
              align: 'center',
              fontWeight: 'bold',
              fill: '0xffcc99',
              fontSize: 20,
              letterSpacing: 5
            }}
          />
          <Text
            text={`Start`}
            anchor={0.5}
            x={300}
            y={300}
            interactive={true}
            pointerdown={startGame}
            style={{
              align: 'center',
              fontWeight: 'bold',
              fill: '0x990000',
              fontSize: 20,
              letterSpacing: 1
            }}
          />
        </Container>  
      ) }

      { screen === 'game' && (
        <Container>
          <Text text={`Score: ${score}`} x={10} y={10} style={{ fill: "#fff", fontSize: 24 }} />
          <Text text={`Time: ${timeLeft}`} x={500} y={10} style={{ fill: "#fff", fontSize: 24 }} />
          {/* Basket */}
          {/* <Sprite texture={basketTexture} x={basketRef.current.x} y={550} width={basketRef.current.width} height={20} /> */}
          <Graphics draw={(g) => {
            g.clear();
            g.beginFill(0xffd700);
            g.drawRect(basketRef.current.x, 400, basketRef.current.width, 20);
            g.endFill();
          }} />
          {objects.map((obj, idx) => (          
            <Sprite key={idx} image={'/assets/game/acorn-basket/food-acorn.png'} anchor={0.5} x={obj.x} y={obj.y} />
          ))}
        </Container>
      ) }
      
    </Stage>
    <pre>
      {JSON.stringify(objects, null, 2)}
    </pre>
    </>
  )
}

export default AcornBasket