function setup() {
  createCanvas(400, 620);
  background(252, 232, 238); 
  noLoop()
  noCursor();
}

function draw() {
  background(252, 232, 238); 

  let offsetX = map(mouseX, 0, width, -100, 100); 
  offsetX = constrain(offsetX, -100, 100); 

  translate(offsetX, 0); 

  let giraffeY = map(mouseY, 0, height, 50, 120); 
  drawGiraffe(200, giraffeY); 
  
  stroke(0); 
  strokeWeight(0);
  fill(85, 187, 250); 
  rect(125, height / 2, 150, height / 4, 10); 
  
  drawWavyLine(135, height / 2 + height / 4, 130, 20); 

  drawKidLeg(200, height * 2 / 3 + 50); 

  drawSpotlight(mouseX, mouseY);
}

function drawSpotlight(x, y) {
  push();
  noStroke();
  fill(255, 255, 200, 150); 
  ellipse(x, y, 200, 200);  
  pop();
}

function drawGiraffe(x, y) {
  noStroke();
  fill(242, 196, 44);
  rect(x - 30, y + 80, 60, 200); 
  fill(255, 204, 0); 
  ellipse(x, y - 10, 80, 80); 
  ellipse(x, y + 40, 100, 120); 

  fill(115, 60, 5); 
  arc(x + 30, y + 150, 32, 20, HALF_PI, TWO_PI - HALF_PI, OPEN);
  arc(x + 30, y + 168, 32, 20, HALF_PI, TWO_PI - HALF_PI, OPEN);
  arc(x - 30, y + 118, 32, 20, TWO_PI - HALF_PI, HALF_PI, OPEN);
  arc(x - 30, y + 132, 32, 20, TWO_PI - HALF_PI, HALF_PI, OPEN);
  arc(x - 30, y + 220, 32, 20, TWO_PI - HALF_PI, HALF_PI, OPEN);
  arc(x - 30, y + 202, 32, 20, TWO_PI - HALF_PI, HALF_PI, OPEN);
  
  stroke(0);
  strokeWeight(3);

  push();
  noFill();
  arc(x, y + 30, 30, 20, 0, PI, OPEN);
  arc(x - 20, y - 17, 20, 15, PI, TWO_PI);
  arc(x + 20, y - 17, 20, 15, PI, TWO_PI);
  arc(x + 18, y + 12, 15, 10, PI, QUARTER_PI);
  arc(x - 18, y + 12, 15, 10, PI - QUARTER_PI, QUARTER_PI - QUARTER_PI);
  pop();

  fill(0);
  ellipse(x - 20, y - 10, 10, 12); 
  ellipse(x + 20, y - 10, 10, 12); 
  ellipse(x - 18, y + 14, 5, 5); 
  ellipse(x + 18, y + 14, 5, 5); 

  push();
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(x - 9, y + 40, 8, 10); 
  rect(x + 1, y + 40, 8, 10); 
  pop();

  noStroke();
  fill(255, 204, 0);
  triangle(x - 60, y - 70, x - 30, y - 35, x - 40, y - 10); 
  triangle(x + 60, y - 70, x + 30, y - 35, x + 40, y - 10); 

  fill(0);
  triangle(x - 50, y - 50, x - 35, y - 35, x - 40, y - 30); 
  triangle(x + 50, y - 50, x + 35, y - 35, x + 40, y - 30); 

  stroke("#FFC107");
  strokeWeight(3);
  line(x - 30, y - 60, x - 20, y - 40); 
  line(x + 30, y - 60, x + 20, y - 40); 
  fill(255, 204, 0);
  ellipse(x - 30, y - 60, 10, 10); 
  ellipse(x + 30, y - 60, 10, 10); 
}

function drawKidLeg(x, y) {
  fill(212, 207, 171); 
  noStroke();
  
  beginShape();
  vertex(x + 20, y + 14);  
  vertex(x - 60, y + 16);  
  vertex(x - 59, y + 50);  
  vertex(x - 70, y + 100);  
  vertex(x - 25, y + 100);  
  vertex(x - 10, y + 70);  
  vertex(x + 25, y + 10);
  endShape(CLOSE);

  beginShape();
  vertex(x + 5, y + 14);
  vertex(x + 65, y + 16);
  vertex(x + 70, y + 56);
  vertex(x + 60, y + 100);  
  vertex(x + 40, y + 100);
  vertex(x + 15, y + 100);
  vertex(x + 5, y + 10);
  endShape(CLOSE);

  stroke(180); 
  strokeWeight(1);
  
  line(x - 60, y + 20, x - 40, y + 50); 
  line(x - 50, y + 30, x - 30, y + 80); 
  line(x - 45, y + 60, x - 35, y + 100); 
  
  line(x + 20, y + 30, x + 45, y + 70); 
  line(x + 25, y + 60, x + 50, y + 100); 
  line(x + 35, y + 40, x + 55, y + 80); 

  stroke(255); 
  strokeWeight(0.5);

  line(x - 55, y + 30, x - 35, y + 70); 
  line(x - 45, y + 40, x - 25, y + 90); 

  line(x + 30, y + 40, x + 50, y + 80); 
  line(x + 40, y + 50, x + 60, y + 90); 

  fill(255, 200, 150); 

  beginShape();
  vertex(x - 57, y + 100);
  vertex(x - 75, y + 125);
  vertex(x - 65, y + 140);
  vertex(x - 45, y + 146);
  vertex(x - 45, y + 130);
  vertex(x - 35, y + 100);
  endShape(CLOSE);

  beginShape();
  vertex(x + 50, y + 100);
  vertex(x + 40, y + 110);
  vertex(x + 45, y + 140);
  vertex(x + 25, y + 145);
  vertex(x + 10, y + 113);
  vertex(x + 20, y + 100);
  endShape(CLOSE);

  fill(237, 167, 114);
  ellipse(x - 63, y + 140, 6, 6); 
  ellipse(x - 58, y + 141, 6, 6); 
  ellipse(x - 52, y + 142, 6, 6); 
  ellipse(x - 46, y + 143, 6, 6); 
  ellipse(x - 67, y + 139, 6, 6); 

  ellipse(x + 43, y + 139, 5, 5); 
  ellipse(x + 38, y + 140, 6, 6);
  ellipse(x + 33, y + 141, 6, 6); 
  ellipse(x + 28, y + 141, 6, 6); 
  ellipse(x + 23, y + 142, 7, 7); 
}

function drawWavyLine(x, y, width, waveHeight) {
  push();
  stroke(232, 227, 193); 
  strokeWeight(3);
  noFill();

  fill(245, 241, 220);
  rect(124, 463, 147, 12, 10);

  for (let i = x; i < x + width; i += 16) {
    arc(i, y + 2, 18, waveHeight * 1.5, 0, PI); 
  }
}

function mouseMoved() {
  redraw(); 
}

