import { Graphics, Assets, Text, TextStyle, Container, Sprite } from "pixi.js";

export const gameAcornBasket = (app, username, handleScoreUpdate) => {
  // // Create a new application
  // const app = new Application();

  // // Initialize the application
  // await app.init({ background: "#1099bb", width: 600, height: 600 });

  // Append the application canvas to the document body
  //document.getElementById("pixi-container").appendChild(app.canvas);


  // Assets/Preloader
  const assetLibrary = {
    bundles: [
      {
        name: 'game-screen',
        assets: [
          {
            alias: 'acorn',
            src: '/assets/game/acorn-basket/food-acorn.png'
          },
          {
            alias: 'bonus',
            src: '/assets/game/acorn-basket/food-bonus.png'
          },
          {
            alias: 'bomb',
            src: '/assets/game/acorn-basket/food-bomb.png'
          }
        ]
      }
    ]
  };

  Assets.init({ manifest: assetLibrary });
  Assets.backgroundLoadBundle(['game-screen']);

  // Assets.add({
  //   alias: 'acorn',
  //   src: '/assets/game/acorn-basket/food-acorn.png'
  // });
  // Assets.add({
  //   alias: 'bonus',
  //   src: '/assets/game/acorn-basket/food-bonus.png'
  // });
  // Assets.add({
  //   alias: 'bomb',
  //   src: '/assets/game/acorn-basket//food-bomb.png'
  // });

  // async function preloadGameAssets() {
  //   await Assets.load({
  //     acorn: '/assets/game/acorn-basket//food-acorn.png',
  //     bonus: '/assets/game/acorn-basket/food-bonus.png',
  //     bomb: '/assets/game/acorn-basket/food-bomb.png'
  //   });
  // }
  // preloadGameAssets()
  //   .then(() => {
  //       console.log('Assets loaded successfully!');
  //       setup();
  //   })
  //   .catch((err) => {
  //       console.error('Error loading assets:', err);
  //   });



  // Global
  let currentScene = null;
  let gameStartTime = null;

  function changeScene(newScene) {
    if (currentScene) app.stage.removeChild(currentScene);
    currentScene = newScene;
    app.stage.addChild(currentScene);
  }

  function getRandomNumber(x, y) {
    return Math.random() * (y - x) + x;
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
  const welcomeText = new Text({ text: `Hello, ${username}!`, style: titleStyle });
  welcomeText.anchor.set(0.5);
  welcomeText.x = app.renderer.width / 2;
  welcomeText.y = (app.renderer.height / 2) - 30 ;
  titleScreen.addChild(welcomeText);
  const startButton = new Text({ text: 'START!', style: titleStyle });
  startButton.anchor.set(0.5);
  startButton.x = app.renderer.width / 2;
  startButton.y = app.renderer.height / 2;
  startButton.interactive = true;
  startButton.buttonMode = true;
  startButton.cursor = 'pointer';
  startButton.on('pointerdown', startGame);
  titleScreen.addChild(startButton);
  changeScene(titleScreen);

  // Basket
  const basket = new Graphics();
  basket.fill(0xffffff);
  basket.rect(0, 0, 130, 20);
  basket.fill();
  basket.y = app.renderer.height - 50;
  basket.x = app.renderer.width / 2 - 50;

  // Objects
  const food = [];
  const foodAssets = Assets.loadBundle('game-screen');
  const foodTypes = [
    { type: 'acorn', texture: foodAssets.acorn, color: 0x8b4513, spawnRate: 70, points: 1 }, // Acorn
    { type: 'bonus', texture: foodAssets.bonus, color: 0xffd700, spawnRate: 10, points: 3 }, // Big Acorn
    { type: 'bomb', texture: foodAssets.bomb, color: 0xff0000, spawnRate: 20, points: -5 } // Bomb
  ];
  
  function getRandomFoodType() {
    const totalRate = foodTypes.reduce((sum, food) => sum + food.spawnRate, 0);
    let random = Math.random() * totalRate;

    for (const food of foodTypes) {
        // Prevent bombs from spawning in the first 5 seconds
        if (food.type === 'bomb' && Date.now() - gameStartTime < 5000) {
            // spawn regular acorn in place of bomb
            return { type: 'acorn', color: 0x8b4513, spawnRate: 70, points: 1 };
            //continue;
        }
        if (random < food.spawnRate) {
            return food;
        }
        random -= food.spawnRate;
    }
}

  function spawnFood() {
    if (currentScene !== gameScreen) return;
    //const type = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    const type = getRandomFoodType();
    try {
      const foodObj = new Sprite(type.texture);
      //foodObj.fill(type.color);
      //foodObj.circle(0, 0, 25);
      //foodObj.fill();
      //foodObj.x = Math.random() * app.renderer.width;
      foodObj.x = getRandomNumber(80, (app.renderer.width - 170));
      foodObj.y = 0;
      foodObj.points = type.points;
      foodObj.type = type.type;
      food.push(foodObj);
      app.stage.addChild(foodObj);
    } catch(e) {
      console.log(`Error: ${e}`);
      console.log(JSON.stringify(type, null, 2));
    }
    
  }
  setInterval(spawnFood, 500);

  // Make objects fall
  app.ticker.add(() => {
    for (let i = food.length - 1; i >= 0; i--) {
      const obj = food[i];
      switch (obj.type) {
        case 'bomb':
          obj.y += 12;
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
  let timeLeft = 30;
  let gameEnded = false;
  let timerInterval = null;

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

  // Game Start
  function startGame() {
    changeScene(gameScreen);
    gameStartTime = Date.now();
    score = 0;
    timeLeft = 30;
    gameEnded = false;
    food.length = 0;
    timerInterval = setInterval(() => {
      if (!gameEnded) {
        timeLeft--;
        timertext.text = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
          gameOver();
        }
      }
    }, 1000);
  }

  // Game Over
  function gameOver() {
    if (!gameEnded) {
      gameEnded = true;
      clearInterval(timerInterval);
      if( handleScoreUpdate && score > 0 ) handleScoreUpdate(score);
      showGameOverDialog();
    }
  }

  // Game Over Dialog
  function showGameOverDialog() {
    const gameOverDialog = new Container();

    const overlay = new Graphics();
    overlay.fill( { color: 0x000000, alpha: 0.5 });
    overlay.rect(0, 0, app.renderer.width, app.renderer.height);
    overlay.fill();
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
    restartButton.cursor = 'pointer';
    restartButton.on('pointerdown', () => {
      startGame();
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
    if (left && basket.x > 60) basket.x -= 8;
    if (right && basket.x < app.renderer.width - basket.width - 150) basket.x += 8;
  });

}