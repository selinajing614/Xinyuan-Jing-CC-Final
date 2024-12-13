let sleepData = [
  { sleepTime: 10.83, deepSleep: 5.28, mentalState: 8 },  // Saturday
  { sleepTime: 6.23, deepSleep: 3.3, mentalState: 3 },   // Sunday
  { sleepTime: 8.37, deepSleep: 2.13, mentalState: 6 },  // Monday
  { sleepTime: 7.05, deepSleep: 1.62, mentalState: 4 },  // Tuesday
  { sleepTime: 5.75, deepSleep: 1.2, mentalState: 1 }    // Wednesday
];

let growthProgress = [0, 0, 0, 0, 0];  
let sunProgress = 0;  

function setup() {
  createCanvas(600, 600);
  noStroke();
}

function draw() {
  let avgGrowthProgress = averageGrowth(); 
  drawBackgroundTransition(avgGrowthProgress);

  drawSunAndMoon(avgGrowthProgress);

  let allFullyGrown = true;
  
  for (let i = 0; i < sleepData.length; i++) {
    let xOffset = map(i, 0, sleepData.length - 1, 100, width - 100);
    let yOffset = height - 100; 

    push();
    translate(xOffset, yOffset);
    
    drawFlower(sleepData[i].sleepTime, sleepData[i].deepSleep, sleepData[i].mentalState, growthProgress[i]);
    
    drawFlowerPot();
    pop();

  
    if (growthProgress[i] < 1) {
      growthProgress[i] += map(sleepData[i].mentalState, 1, 10, 0.003, 0.009);
      allFullyGrown = false; 
    }
  }

  if (allFullyGrown) {
    for (let i = 0; i < growthProgress.length; i++) {
      growthProgress[i] = 0;  
    }
  }
}

function drawSunAndMoon(progress) {
  let sunY = map(progress, 0, 1, height + 50, 80);  
  let moonY = map(progress, 0, 1, 80, -100);       

  let sunSize = map(progress, 0, 1, 0, 100);
  let moonSize = map(progress, 0, 1, 100, 0);

  fill(250, 230, 115);
  ellipse(width - 80, moonY, moonSize, moonSize);  

  fill(245, 143, 42);
  ellipse(width - 80, sunY, sunSize, sunSize); 
}

function drawBackgroundTransition(progress) {
  let nightColor = color(102, 130, 176);  
  let dayColor = color(227, 248, 252);  
  
  let bgColor = lerpColor(nightColor, dayColor, progress); 
  background(bgColor);  
}

function averageGrowth() {
  let sum = 0;
  for (let i = 0; i < growthProgress.length; i++) {
    sum += growthProgress[i];
  }
  return sum / growthProgress.length;
}

function drawFlower(sleepTime, deepSleep, mentalState, progress) {
  let stemHeight = map(sleepTime, 4, 11, 100, 250) * progress;

  let flowerColors = [
    color(250, 145, 197), 
    color(255, 182, 193), 
    color(157, 194, 250), 
    color(216, 177, 250) 
  ];
  let flowerColor = flowerColors[int(map(mentalState, 10, 1, 0, flowerColors.length - 1))];

  let petalCount = map(deepSleep - 1, 1, 4, 5, 12);

  stroke(137, 168, 118);
  strokeWeight(3);
  line(0, 0, 0, -stemHeight);  

  drawLeaves(stemHeight, progress);

  fill(flowerColor);
  noStroke();
  if (progress >= 0.6) {
    for (let i = 0; i < petalCount; i++) {
      let angle = map(i, 0, petalCount, 0, TWO_PI);
      let x = cos(angle) * 30;  
      let y = -stemHeight + sin(angle) * 30;
      ellipse(x, y, 40, 60);  
    }

    fill(250, 248, 157);
    ellipse(0, -stemHeight, 40, 40); 
  }
}

function drawLeaves(stemHeight, progress) {
  if (progress >= 0.2) {
    fill(137, 168, 118);
    ellipse(-20, -stemHeight / 2, 30, 15);  
    ellipse(20, -stemHeight / 2, 30, 15);   
  }
}

function drawFlowerPot() {
  fill(184, 121, 94);  
  rect(-25, 0, 50, 30); 
}
