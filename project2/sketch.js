function setup() {
  createCanvas(600, 600);
  noCursor(); 
  setRabbitColors(); 
  generateDots(); 
}

function draw() {
  background(255); 
  drawBackgroundDots(); 
  let size = map(mouseX, 0, width, 50, 200); //  
  drawRabbit(mouseX, mouseY, size); 
}

// pressed change
function mousePressed() {
  setRabbitColors(); 
  moveAndChangeDots(); 
}

// rabbit color
function setRabbitColors() {
  rabbitColor = color(random(150, 255), random(150, 255), random(150, 255)); 
  innerEarColor = color(255, 201, 211); 
  noseColor = color(250, 132, 152); 
}

let dots = [];
function generateDots() {
  for (let i = 0; i < 100; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      size: random(5, 15),
      color: getRandomColor(),
    });
  }
}

// dots random color
function getRandomColor() {
  return color(random(150, 255), random(150, 255), random(150, 255));
}

function moveAndChangeDots() {
  dots.forEach(dot => {
    dot.x = random(width);
    dot.y = random(height);
    dot.color = getRandomColor();
  });
}

// dots
function drawBackgroundDots() {
  noStroke();
  dots.forEach(dot => {
    fill(dot.color);
    ellipse(dot.x, dot.y, dot.size, dot.size);
  });
}

// rabbit
function drawRabbit(x, y, size) {
  let earHeight = size * 1.5; 
  let earWidth = size * 0.4; 
  let headSize = size; 
  
  // ears
  fill(rabbitColor); 
  noStroke(); 
  ellipse(x - size * 0.3, y - size * 0.8, earWidth, earHeight); 
  ellipse(x + size * 0.3, y - size * 0.8, earWidth, earHeight); 

  // inner ears
  fill(innerEarColor); 
  ellipse(x - size * 0.3, y - size * 0.8, earWidth * 0.6, earHeight * 0.6); 
  ellipse(x + size * 0.3, y - size * 0.8, earWidth * 0.6, earHeight * 0.6); 

  // head
  fill(rabbitColor); 
  ellipse(x, y, headSize, headSize);

  // eyes
  fill(0); 
  ellipse(x - size * 0.2, y - size * 0.1, size * 0.1, size * 0.1); 
  ellipse(x + size * 0.2, y - size * 0.1, size * 0.1, size * 0.1); 

  // nose
  fill(noseColor); 
  ellipse(x, y + size * 0.1, size * 0.1, size * 0.08); 

  // mouth
  noFill(); 
  stroke(150, 2, 69);
  strokeWeight(1.5); 
  beginShape();
  vertex(x - size * 0.05, y + size * 0.15); 
  bezierVertex(x - size * 0.03, y + size * 0.25, x - size * 0.01, y + size * 0.25, x, y + size * 0.15);
  bezierVertex(x + size * 0.01, y + size * 0.25, x + size * 0.03, y + size * 0.25, x + size * 0.05, y + size * 0.15); 
  endShape();
}
