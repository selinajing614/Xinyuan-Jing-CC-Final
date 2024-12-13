let drops = [];
let backgroundColor;
let fadeDuration = 10 * 60;  
function setup() {
  createCanvas(600, 600);
  backgroundColor = color(163, 209, 196);  
  noStroke();
  noCursor();
}

function draw() {
  background(backgroundColor);  
  let currentSecond = second();
  let currentMinute = minute();
 
  if (frameCount % 60 === 0) {
    let col = color(random(100, 255), random(100, 255), random(100, 255), 255);  
    let newDrop = new DropShape(col, frameCount); 
    drops.push(newDrop);
  }

  drops.forEach((drop, index) => {
    dropShow(drop);
    let age = frameCount - drop.startFrame;
    
    if (age > fadeDuration) {
      drops.splice(index, 1);  
    } else {
      drop.color.setAlpha(map(age, 0, fadeDuration, 255, 0));  
    }
  });

  let ringX = mouseX;
  let ringY = mouseY;
  let ringSize = map(mouseX + mouseY, 0, width + height, 100, 600);  

  drawFaintTrack(ringX, ringY, ringSize);
  let ringProgress = map(currentMinute + currentSecond / 60, 0, 60, 0, TWO_PI);  
  drawMinuteRing(ringX, ringY, ringProgress, ringSize);


  if (currentMinute === 0 && currentSecond === 0) {
    drops = [];
  }
}

function mousePressed() {
  backgroundColor = color(random(200, 255), random(200, 255), random(200, 255));  
}

function drawFaintTrack(x, y, size) {
  stroke(255, 255, 227); 
  noFill();
  strokeWeight(2);
  arc(x, y, size, size, 0, TWO_PI); 
}

function drawMinuteRing(x, y, progress, size) {
  stroke(0);
  noFill();
  strokeWeight(2);
  arc(x, y, size, size, -HALF_PI, -HALF_PI + progress);
}

function DropShape(col, startFrame) {
  let x = random(width);
  let y = random(height); 
  let color = col;
  let shapeType = random(['circle', 'rectangle', 'triangle']);
  let size = random(20, 55);

  return { x, y, color, shapeType, size, startFrame };
}

function dropShow(drop) {
  fill(drop.color); 
  if (drop.shapeType === 'circle') {
    ellipse(drop.x, drop.y, drop.size);
  } else if (drop.shapeType === 'rectangle') {
    rect(drop.x - drop.size / 2, drop.y - drop.size / 2, drop.size, drop.size);
  } else if (drop.shapeType === 'triangle') {
    triangle(drop.x - drop.size / 2, drop.y + drop.size / 2, 
             drop.x + drop.size / 2, drop.y + drop.size / 2, 
             drop.x, drop.y - drop.size / 2);
  }
}
