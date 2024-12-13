let angle = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  drawBackground();

  translate(width / 2, height / 2);

  let numRings = 5; 
  let ringGap = 50; 
  let numStripes = 12; 

  for (let j = 0; j < numRings; j++) {
    push();
    rotate(angle * (j + 1) * (mouseX / width)); 
    for (let i = 0; i < numStripes; i++) {
      rotate(TWO_PI / numStripes);

      
      let interColor;
      if (mouseX > width / 2) {
        interColor = lerpColor(color(250, 117, 117), color(255), i / numStripes); 
      } else {
        interColor = lerpColor(color(95, 123, 250), color(255), i / numStripes); 
      }
      fill(interColor);

      let stripeLength = 200 - j * ringGap; 
      rect(0, 0, stripeLength, 30); 
    }
    pop();
  }

  if (mouseIsPressed) {
    angle -= 0.05; 
  } else {
    angle += 0.05; 
}

function drawBackground() {
  stroke(255, 150); 
  noFill();
  for (let y = 0; y < height; y += 20) {
    beginShape();
    for (let x = 0; x < width; x += 20) {
      let wave = sin(x * 0.05 + y * 0.1) * 20; 
      vertex(x, y + wave); 
    }
    endShape();
  }
}
}