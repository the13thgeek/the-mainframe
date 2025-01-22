import React, { useState, useEffect, useRef } from 'react';
import { Stage, Container, Sprite, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";

const AcornBasket = () => {
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [objects, setObjects] = React.useState([]);
  const basketRef = useRef({ x: 200, width: 100 });
  const gameLoop = useRef(null);

  //const basketTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-acorn.png');
  // const acornTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-acorn.png');
  // const bonusTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-bonus.png');
  // const bombTexture = PIXI.Texture.from('/assets/game/acorn-basket/food-bomb.png'); 

  useEffect(() => {
    // Game timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev-1, 0));
    }, 1000);

    // Game Loop
    gameLoop.current = setInterval(() => {
      updateGameObjects();
    }, 16);

    return () => {
      clearInterval(timer);
      clearInterval(gameLoop.current);
    };

  },[]);

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
      const x = Math.random() - 550;
      setObjects((prev) => [...prev, { x, y: 0, type, speed }]);
    }

  };

  return (
    <Stage width={600} height={600} options={{ backgroundColor: 0x000000}}>
      <Text text={`Score: ${score}`} x={10} y={10} style={{ fill: "#fff", fontSize: 24 }} />
      <Text text={`Time: ${timeLeft}`} x={500} y={10} style={{ fill: "#fff", fontSize: 24 }} />
      <Container>
        {/* Basket */}
        {/* <Sprite texture={basketTexture} x={basketRef.current.x} y={550} width={basketRef.current.width} height={20} /> */}
        <Graphics draw={(g) => {
          g.clear();
          g.beginFill(0xffd700);
          g.drawRect(basketRef.current.x, 550, basketRef.current.width, 20);
          g.endFill();
        }} />
        {objects.map((obj, idx) => (          
          <Sprite key={idx} image={'/assets/game/acorn-basket/food-acorn.png'} anchor={0.5} x={obj.x} y={obj.y} width={30} height={30} />
        ))}
      </Container>
    </Stage>
  )
}

export default AcornBasket