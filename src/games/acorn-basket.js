//import { Application, Graphics, Text, TextStyle, Container, Sprite } from "pixi.js";

export const gameAcornBasket = (app) => {
  // // Create a new application
  // const app = new Application();

  // // Initialize the application
  // await app.init({ background: "#1099bb", width: 600, height: 600 });

  // Append the application canvas to the document body
  //document.getElementById("pixi-container").appendChild(app.canvas);

  // Global
  let currentScene = null;

  function changeScene(newScene) {
    if (currentScene) app.stage.removeChild(currentScene);
    currentScene = newScene;
    app.stage.addChild(currentScene);
  }

  // Title Screen
  const titleScreen = new Container();
  const titleStyle = new TextStyle({
    fontFamily: 'Comic Sans MS',
    fontSize: 20,
    fill: '#ffffff'
  });
  const titleText = new Text({ text: 'Acorn Basket', style: titleStyle });
  titleText.anchor.set(0.5);
  titleText.x = app.renderer.width / 2;
  titleText.y = app.renderer.height / 3;
  titleScreen.addChild(titleText);
  const startButton = new Text({ text: 'START!', style: titleStyle });
  startButton.anchor.set(0.5);
  startButton.x = app.renderer.width / 2;
  startButton.y = app.renderer.height / 2;
  startButton.interactive = true;
  startButton.buttonMode = true;
  startButton.on('pointerdown', startGame);
  titleScreen.addChild(startButton);
  changeScene(titleScreen);

  // Basket
  const basket = new Graphics();
  basket.beginFill(0xffffff);
  basket.drawRect(0, 0, 130, 20);
  basket.endFill();
  basket.y = app.renderer.height - 50;
  basket.x = app.renderer.width / 2 - 50;

  // Objects
  const food = [];
  const foodTypes = [
    { type: 'acorn', color: 0x8b4513, points: 1 }, // Acorn
    { type: 'bonus', color: 0xffd700, points: 3 }, // Big Acorn
    { type: 'bomb', color: 0xff0000, points: -5 } // Bomb
  ];
  function spawnFood() {
    if (currentScene !== gameScreen) return;
    const type = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    const foodObj = new Graphics();
    foodObj.beginFill(type.color);
    foodObj.drawCircle(0, 0, 25);
    foodObj.endFill();
    foodObj.x = Math.random() * app.renderer.width;
    foodObj.y = 0;
    foodObj.points = type.points;
    foodObj.type = type.type;
    food.push(foodObj);
    app.stage.addChild(foodObj);
  }
  setInterval(spawnFood, 500);

  // Make objects fall
  app.ticker.add(() => {
    for (let i = food.length - 1; i >= 0; i--) {
      const obj = food[i];
      switch (obj.type) {
        case 'bomb':
          obj.y += 13;
          break;
        case 'bonus':
          obj.y += 10;
          break;
        default:
          obj.y += 8;
      }

      // If food is caught
      if (
        obj.y + 15 > basket.y &&
        obj.x > basket.x &&
        obj.x < basket.x + basket.width
      ) {
        score += obj.points;
        app.stage.removeChild(obj);
        food.splice(i, 1);

        if (score < 0) {
          score = 0;
          gameOver();
        }
      } else if (obj.y > app.renderer.height) {
        app.stage.removeChild(obj);
        food.splice(i, 1);
      }
    }
  });

  // Screen + Score + Timer
  let score = 0;
  let timeLeft = 60;
  let gameEnded = false;

  const gameScreen = new Container();
  gameScreen.addChild(basket);

  const textStyle = new TextStyle({
    fontFamily: 'Comic Sans MS',
    fontSize: 20,
    fill: '#ffffff'
  });
  const scoreText = new Text({ text: `Score: ${score}`, style: textStyle });
  scoreText.x = 10;
  scoreText.y = 10;
  gameScreen.addChild(scoreText);
  const timertext = new Text({ text: `Time: ${timeLeft}`, style: textStyle });
  timertext.x = 500;
  timertext.y = 10;
  gameScreen.addChild(timertext);

  const timerInterval = setInterval(() => {
    if (!gameEnded) {
      timeLeft--;
      timertext.text = `Time: ${timeLeft}`;
      if (timeLeft <= 0) {
        gameOver();
      }
    }
  }, 1000);

  // Game Start
  function startGame() {
    changeScene(gameScreen);
    score = 0;
    timeLeft = 60;
    gameEnded = false;
    food.length = 0;
  }

  // Game Over
  function gameOver() {
    if (!gameEnded) {
      gameEnded = true;
      clearInterval(timerInterval);
      showGameOverDialog();
    }
  }

  // Game Over Dialog
  function showGameOverDialog() {
    const gameOverDialog = new Container();

    const overlay = new Graphics();
    overlay.beginFill(0x000000, 0.5);
    overlay.drawRect(0, 0, app.renderer.width, app.renderer.height);
    overlay.endFill();
    gameOverDialog.addChild(overlay);

    const gameOverStyle = new TextStyle({
      fontFamily: 'Comic Sans MS',
      fontSize: 20,
      align: "center",
      fill: '#ffffff'
    });
    const gameOverText = new Text({ text: `Game Over!\nYour score is ${score}`, style: gameOverStyle });
    gameOverText.anchor.set(0.5);
    gameOverText.x = app.renderer.width / 2;
    gameOverText.y = app.renderer.height / 2 - 50;
    gameOverDialog.addChild(gameOverText);

    const restartButton = new Text({ text: "Restart", style: gameOverStyle });
    restartButton.anchor.set(0.5);
    restartButton.x = app.renderer.width / 2;
    restartButton.y = app.renderer.height / 2 + 50;
    restartButton.interactive = true;
    restartButton.buttonMode = true;
    restartButton.on('pointerdown', () => {
      changeScene(gameScreen);
    });
    gameOverDialog.addChild(restartButton);

    changeScene(gameOverDialog);
  }

  // Controls
  let left = false;
  let right = false;

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') left = true;
    if (e.key === 'ArrowRight') right = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') left = false;
    if (e.key === 'ArrowRight') right = false;
  });

  app.ticker.add(() => {
    scoreText.text = `Score: ${score}`;
    if (left && basket.x > 0) basket.x -= 7;
    if (right && basket.x < app.renderer.width - basket.width) basket.x += 7;
  });

}