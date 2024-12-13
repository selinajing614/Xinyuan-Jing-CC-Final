let coverImg, buttonImg, backgroundImg, spiderImg, poisonImg;
let spider;
let gameState = 0; 
let canvasWidth, canvasHeight;
let gameStarted = false;
let buttonX, buttonY;
let music;

// Scene 1
let poisonDrops = [];
let numDrops = 5;
let timer = 15;
let startTime;

// Scene 2
let spiderJumpImg, backgroundImg2, groundImg, heartImg;
let obstacles = [];
let groundY;
let backgroundX = 0;
let groundX = 0;
let stepDistance = 3;
let backgroundSpeedMultiplier = 3;
let obstacleSpeed = 5;
let lives = 5;
let distanceToNextScene = 1600;
let playerDistance = 0;
let obstacleTimer = 0;

// Scene 3
let netImg, findImg, antImg, bugImg, flyImg;
let spider3;
let collectibleObjects = [];
let collectibleCount = 0;
let collectibleTimer;
let bouncingCircles = [];
let totalCircles = 5;
let endingImg;
let replayButtonX, replayButtonY, replayButtonWidth = 150, replayButtonHeight = 50;

function preload() {
  coverImg = loadImage("cover.jpg");
  buttonImg = loadImage("button.png");
  spiderImg = loadImage("spider.gif");
  backgroundImg = loadImage("background.png");
  poisonImg = loadImage("rain.png");

  spiderJumpImg = loadImage("jump.gif");
  backgroundImg2 = loadImage("background2.png");
  groundImg = loadImage("ground2.png");
  heartImg = loadImage("heart.png");

  netImg = loadImage("net.PNG");
  findImg = loadImage("find.gif");
  antImg = loadImage("ant.PNG");
  bugImg = loadImage("bug.PNG");
  flyImg = loadImage("fly.PNG");
  endingImg = loadImage("ending.png");
  music = loadSound("music.mp3"); 
}

function setup() {
  canvasWidth = coverImg.width / 2;
  canvasHeight = coverImg.height / 2;
  createCanvas(canvasWidth, canvasHeight);

  buttonX = canvasWidth / 2 - buttonImg.width / 4 - 13;
  buttonY = canvasHeight / 2 - 50;

  groundY = height - 50; 
  replayButtonX = width / 2 - replayButtonWidth / 2;
  replayButtonY = height / 2 + 100;
  spider = new Spider(width / 2 || 100, height - 210 || 300);
  for (let i = 0; i < numDrops; i++) {
    poisonDrops.push(new PoisonDrop(random(width), random(-200, -50), random(2, 5)));
  }
   music.loop();
}


function draw() {
  if (gameState === 0) {
    drawCoverScreen();
  } else if (gameState === 1) {
    drawScene1();
  } else if (gameState === 2) {
    drawScene2();
  } else if (gameState === 3) {
    drawScene3();
  } else if (gameState === 4) {
    drawFinalScene();
  }
}

function drawCoverScreen() {
  image(coverImg, 0, 0, canvasWidth, canvasHeight);
  image(buttonImg, buttonX, buttonY, buttonImg.width / 2, buttonImg.height / 2);
}

function drawScene1() {
  background(225);
  image(backgroundImg, 0, 0, width, height);

  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  text("Dodge the poison drops!⬅️➡️", width / 2, 10);

  spider.display();
  spider.move();

  for (let drop of poisonDrops) {
    drop.display();
    drop.fall();
    if (drop.hits(spider)) {
      resetScene1();
      return;
    }
  }

  displayTimer();

  if (millis() - startTime > timer * 1000) {
    gameState = 2; 
    setupScene2();
  }
}

function drawScene2() {
  background(225);
  let bgWidth = backgroundImg2.width / 2;
  image(backgroundImg2, backgroundX, 0, bgWidth, height);
  image(backgroundImg2, backgroundX + bgWidth, 0, bgWidth, height);
  image(groundImg, groundX, groundY - 180, width, 230);
  image(groundImg, groundX + width, groundY - 180, width, 230);

  fill(0);
  textSize(24);
  textAlign(CENTER, TOP);
  text("Jump over the obstacles!(space bar⬅️➡️)", width / 2, 10);

  if (millis() - obstacleTimer > 3000) {
    obstacles.push(new Obstacle(width, groundY - 40, 20));
    obstacleTimer = millis();
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.display();
    obs.move(obstacleSpeed);

    if (obs.hits(spider)) {
      loseLife();
      obstacles.splice(i, 1);
    }

    if (obs.x < -obs.size) {
      obstacles.splice(i, 1);
    }
  }

  displayLives();
  spider.applyGravity();
  spider.display();

  if (keyIsDown(LEFT_ARROW)) {
    spider.move(-stepDistance);
    backgroundX += stepDistance * backgroundSpeedMultiplier;
    groundX += stepDistance * backgroundSpeedMultiplier;
    playerDistance = max(playerDistance - stepDistance, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spider.move(stepDistance);
    backgroundX -= stepDistance * backgroundSpeedMultiplier;
    groundX -= stepDistance * backgroundSpeedMultiplier;
    playerDistance += stepDistance;

    if (playerDistance >= distanceToNextScene) {
      gameState = 3; 
      setupScene3();
    }
  }

  if (backgroundX <= -bgWidth) backgroundX = 0;
  if (groundX <= -width) groundX = 0;

  if (lives <= 0) resetGame();
}

function drawScene3() {
  background(225);

  image(netImg, 0, 0, width, height);

  for (let i = collectibleObjects.length - 1; i >= 0; i--) {
    collectibleObjects[i].display();

    if (collectibleObjects[i].isCollected(spider3)) {
      collectibleObjects.splice(i, 1);
      collectibleCount++;
    }
   for (let circle of bouncingCircles) {
   circle.display();
   circle.move();
}
  }

  displayCollectibleCounter();
  fill(145, 17, 6);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Click to clear the screen! Collect the bugs!", width / 2, 12);
  
  if (millis() - collectibleTimer > 7000) {
    for (let i = 0; i < 5; i++) {
      collectibleObjects.push(new Collectible(random(width), random(height), getRandomCollectibleImage()));
    }
    collectibleTimer = millis();
  }
  spider3.move();
  spider3.display();
}

function displayTimer() {
  let timeLeft = timer - int((millis() - startTime) / 1000);
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Time: 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`, 10, 10);
}

function mousePressed() {
  if (!gameStarted) {
    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonImg.width / 2 &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonImg.height / 2
    ) {
      gameStarted = true;
      startTime = millis();
      gameState = 1;
    }
  } else if (gameState === 3) { 
    for (let circle of bouncingCircles) {
      if (circle.isClicked(mouseX, mouseY)) {
        circle.disappear();
      }
    }
  }else if (gameState === 4) {
    if (
      mouseX > replayButtonX &&
      mouseX < replayButtonX + replayButtonWidth &&
      mouseY > replayButtonY &&
      mouseY < replayButtonY + replayButtonHeight
    ) {
      resetGame();
      gameState = 0;  
      gameStarted = false;
    }
  }
}

function keyPressed() {
  if (gameState === 1 || gameState === 2) {
    if (keyCode === LEFT_ARROW) spider.setDirection(-1);
    else if (keyCode === RIGHT_ARROW) spider.setDirection(1);
    if (key === ' ' && gameState === 2) spider.jump();
  } else if (gameState === 3) {
    if (keyCode === LEFT_ARROW) spider3.setDirection(-1, 0);
    if (keyCode === RIGHT_ARROW) spider3.setDirection(1, 0);
    if (keyCode === UP_ARROW) spider3.setDirection(0, -1);
    if (keyCode === DOWN_ARROW) spider3.setDirection(0, 1);
  }
}

function keyReleased() {
  if (gameState === 1 || gameState === 2) {
    spider.setDirection(0);
  } else if (gameState === 3) {
    spider3.setDirection(0, 0);
  }
}

function resetScene1() {
  startTime = millis();
  spider = new Spider(width / 2, height - 210);
}

function setupScene2() {
  backgroundX = 0;
  groundX = 0;
  spider = new Spider(width / 4, groundY - 150);
  obstacleTimer = millis();
}

function setupScene3() {
  spider3 = new SpiderScene3(width / 2, height / 2);
  collectibleObjects = [];
  for (let i = 0; i < 5; i++) {
    collectibleObjects.push(new Collectible(random(width), random(height), getRandomCollectibleImage()));
  }
  collectibleTimer = millis();
  collectibleCount = 0;
  bouncingCircles = [];
for (let i = 0; i < totalCircles; i++) {
  let size = random(30, 50);
  let x = random(size, width - size);
  let y = random(size, height - size);
  let speedX = random(-3, 1);
  let speedY = random(-3, 1);
  bouncingCircles.push(new BouncingCircle(x, y, size, speedX, speedY));
  }
}

function loseLife() {
  lives -= 1;
}

function resetGame() {
  lives = 5;
  backgroundX = 0;
  groundX = 0;
  playerDistance = 0;
  obstacles = [];
  obstacleTimer = millis();
  resetSpiderPosition();
}

function resetSpiderPosition() {
  spider.x = width / 4;
  spider.y = groundY - 150;
  spider.isJumping = false;
  spider.yVelocity = 0;
}

function displayLives() {
  for (let i = 0; i < lives; i++) {
    image(heartImg, width - (i + 1) * 30, 20, 25, 25);
  }
}

function displayCollectibleCounter() {
  fill(255);
  noStroke();
  rect(220, 8, 650, 30);
  fill(0);
  textSize(27);
  textAlign(RIGHT, TOP);
  text(`Collected: ${collectibleCount}/20`, width - 10, 10);

  if (collectibleCount >= 20) {
   gameState = 4; 
  }
}

function drawFinalScene() {
  image(endingImg, 0, 0, width, height);
  fill(200, 100, 100);
  rect(replayButtonX, replayButtonY, replayButtonWidth, replayButtonHeight, 10);
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Replay", replayButtonX + replayButtonWidth / 2, replayButtonY + replayButtonHeight / 2);
  }

function getRandomCollectibleImage() {
  let images = [antImg, bugImg, flyImg];
  return random(images);
}

function resetGame() {
  lives = 5;
  playerDistance = 0;
  obstacles = [];
  poisonDrops = [];
  obstacleTimer = millis();
  collectibleObjects = [];
  collectibleCount = 0;
  bouncingCircles = [];
  
  for (let i = 0; i < numDrops; i++) {
    poisonDrops.push(new PoisonDrop(random(width), random(-200, -50), random(2, 5)));
  }
  spider = new Spider(width / 2, height - 210);
  spider3 = new SpiderScene3(width / 2, height / 2);
}

class Spider {
  constructor(x, y) {
    this.x = x || 100; 
    this.y = y || 200; 
    this.size = 120;
    this.xdir = 0; 
    this.yVelocity = 0;
    this.isJumping = false;
  }

  display() {
    image(
      gameState === 1 ? spiderImg : spiderJumpImg,
      this.x,
      this.y,
      this.size,
      this.size * (spiderImg.height / spiderImg.width)
    );
  }

  setDirection(dir) {
    this.xdir = dir || 0;
  }

  move(step = this.xdir * 5) {
    this.x += step;
    this.x = constrain(this.x, 0, width - 200);
  }

  applyGravity() {
    if (this.isJumping) {
      this.y += this.yVelocity;
      this.yVelocity += 0.5;

      if (this.y >= groundY - this.size) {
        this.y = groundY - this.size;
        this.isJumping = false;
        this.yVelocity = 0;
      }
    }
  }

  jump() {
    if (!this.isJumping) {
      this.yVelocity = -12;
      this.isJumping = true;
    }
  }
}

class SpiderScene3 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 160; 
    this.xdir = 0;
    this.ydir = 0;
  }

  display() {
    image(findImg, this.x, this.y, this.size, this.size * (findImg.height / findImg.width));
  }

  setDirection(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  move() {
    this.x += this.xdir * 5;
    this.y += this.ydir * 5;
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }
}

class PoisonDrop {
  constructor(x, y, speed) {
    this.x = x || random(width);
    this.y = y || random(-200, -50);
    this.size = 20;
    this.speed = speed || 2;
  }

  display() {
    image(poisonImg, this.x, this.y, this.size, this.size * (poisonImg.height / poisonImg.width));
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, -50);
      this.x = random(width);
      this.speed = random(2, 5);
    }
  }

  hits(spider) {
    let d = dist(
      this.x,
      this.y,
      spider.x + spider.size / 2,
      spider.y + spider.size / 2
    );
    return d < (this.size + spider.size) / 2;
  }
}

class Obstacle {
  constructor(x, y, size) {
    this.x = x || width;
    this.y = y || groundY - 40;
    this.size = size || 20;
  }

  display() {
    fill(0);
    rect(this.x, this.y - this.size, this.size, this.size);
  }

  move(speed) {
    this.x -= speed;
  }

  hits(spider) {
    let d = dist(
      this.x,
      this.y,
      spider.x + spider.size / 2,
      spider.y + spider.size / 2
    );
    return d < (this.size + spider.size) / 2;
  }
}

class Collectible {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.size = 100; 
    this.img = img;
  }

  display() {
    image(
      this.img,
      this.x,
      this.y,
      this.size,
      this.size * (this.img.height / this.img.width)
    );
  }

  isCollected(spider) {
    let d = dist(
      this.x + this.size / 2,
      this.y + this.size / 2,
      spider.x + spider.size / 2,
      spider.y + spider.size / 2
    );
    return d < (this.size + spider.size) / 2;
  }
}
  class BouncingCircle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = 0.5;  
    this.ySpeed = 0.5; 
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1; 
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;  
    }
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }

  isClicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }

  disappear() {
    this.x = -1000; 
    this.y = -1000;
  }
}
