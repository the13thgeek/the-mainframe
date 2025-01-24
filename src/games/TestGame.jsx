import React, { useState, useEffect } from 'react';
import { TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';

const TestGame = ({ username = 'default' }) => {
  const spriteUrl = '/assets/game/acorn-basket/food-acorn.png';
  const [screen, setScreen] = useState('title');

  const startGame = (event) => {
    alert("START");
  };


  return (
    <Stage width={600} height={450} options={{ background: 0x000000 }} interactive={'auto'}>
      {/* <Sprite image={spriteUrl} x={100} y={100} /> */}
      {screen === "title" && (
        <Container x={0} y={0} width={600} height={450}>
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
            buttonMode
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
      )}
    </Stage>
  )
}

export default TestGame