//Description: blueish-grey earpods, one plus brand, logo on the bottom, P shape earpods, cats hide it

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  noStroke();
  fill('rgba(146,219,250,0.96)')
  rect(0,0,800,800)
  
  //background pattern
  push()
  fill('rgb(129,212,248)')
  ellipse(400,370,1000,700)
  fill('rgb(109,208,250)')
  ellipse(400,500,900,700)
  fill('rgb(88,200,248)')
  ellipse(400,700,900,800)
  fill('rgb(69,177,223)')
  ellipse(400,900,900,900)
  fill('rgb(46,156,202)')
  ellipse(400,1040,780,900)
  pop()
  
  //nails
  fill('rgb(230,209,209)')
  triangle(180,270,210,340,180,340)
  fill('rgb(230,209,209)')
  triangle(320,200,290,300,330,300)
  fill('rgb(230,209,209)')
  triangle(440,210,480,300,440,300)
  fill('rgb(230,209,209)')
  triangle(560,270,575,340,540,340)
  
  //leg
  fill('rgb(229,224,224)')
  rect(250,600,270,340)
  
  //large paw
  fill('rgb(241,237,237)')
  ellipse(390,490,450,370)
  
  //toes
  fill('rgb(241,237,237)')
  circle(220,380,125)
  
  fill('rgb(241,237,237)')
  circle(320,320,125)
  
  fill('rgb(241,237,237)')
  circle(440,320,125)
  
  fill('rgb(241,237,237)')
  circle(540,380,125)
  
  //inside paw big
  fill('rgb(247,212,212)')
  circle(340,550,160)
  
  fill('rgb(247,212,212)')
  circle(440,550,160)
  
  fill('rgb(247,212,212)')
  circle(390,480,160)
  
  //inside paw small
  fill('rgb(247,212,212)')
  circle(220,380,70)
  fill('rgb(247,212,212)')
  circle(320,320,70)
  fill('rgb(247,212,212)')
  circle(440,320,70)
  fill('rgb(247,212,212)')
  circle(540,380,70)
  
  //shade
  fill('rgb(100,115,117)')
  rect(290, 465, 200, 150, 20)
  
  //earpods box
  fill('rgb(155,176,179)')
  rect(285, 460, 200, 150, 20)
  fill('rgb(127,145,148)')
  rect(285, 460, 200, 65, 20,20,0,0)
  fill('rgb(71,73,73)')
  rect(285, 520, 200, 4)
  fill('black')
  text('ONE PLUS',355,590)
  
  //earpod #1
  push()
  let angel=radians(110)
  translate(width / 2, height / 2)
  rotate(angel)
  rectMode(CENTER);
  fill('rgb(132,146,169)')
  rect(65,107,80,20,0,20,20,0)
  pop()
  
  fill('rgb(155,176,179)')
  ellipse(300,390,40,50)
  
  push()
  fill('rgb(65,71,71)')
  rotate(13)
  translate(width / 2, height / 2)
  ellipse(50,-170,20,50)
  pop()
  
  //earpod #2
  push()
  translate(width / 2, height / 2)
  rotate(95)
  rectMode(CENTER);
  fill('rgb(132,146,169)')
  rect(90,-60,90,20,0,20,20,0)
  pop()
  fill('rgb(155,176,179)')
  ellipse(470,400,40,50)
  
  push()
  fill('rgb(65,71,71)')
  rotate(12)
  translate(width / 2, height / 2)
  ellipse(-230,190,20,50)
  pop()
 
  //lights
  fill("white")
  ellipse(385,535,5)
  ellipse(271,455,5)
  ellipse(530,445,5)
  
  //music notes #1
  fill('white')
  ellipse(100,200,10,15)
  fill('white')
  ellipse(128,190,10,15)
  
  stroke('white')
  strokeWeight(3)
  line(95,165,122,155)

  stroke('white')
  strokeWeight(3)
  line(95,165,103,200)
  
  stroke('white')
  strokeWeight(3)
  line(131,190,122,155)
  
  //music notes #2
  fill('white')
  ellipse(600,220,10,15)
  fill('white')
  ellipse(628,229,10,15)
  
  stroke('white')
  strokeWeight(3)
  line(605,185,630,190)

  stroke('white')
  strokeWeight(3)
  line(605,185,603,215)
  
  stroke('white')
  strokeWeight(3)
  line(631,220,632,190)
  
  
  
  
  
  
}