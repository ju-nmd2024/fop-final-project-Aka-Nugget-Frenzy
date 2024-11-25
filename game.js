//NuggetGame Characters
//backGround
//yellowGuy
//oppGuy
//jibsGuy
//nugget
//beer

function gameFloor(x, y) {
  noStroke();
  fill(0, 255, 0);
  rect(x, y, 1200, 675);
}

function yellowGuy(x, y) {
  push();
  stroke(0);
  strokeWeight(2);
  fill(255, 255, 0);
  square(x, y, 50);
  pop();
}

function oppGuy(x, y) {
  push();
  stroke(0);
  strokeWeight(2);
  fill(0, 0, 255);
  square(x, y, 50);
  pop();
}

function jibsGuy(x, y) {
  push();
  stroke(0);
  strokeWeight(2);
  fill(100, 255, 100);
  square(x, y, 50);
  pop();
}

function nugget(x, y) {
  fill(255, 165, 0);
  ellipse(x, y, 30);
}

function beer(x, y) {
  fill(185, 165, 0);
  ellipse(x, y, 15, 30);
}

function setup() {
  createCanvas(1200, 675);
  background(0, 200, 250);
}

function draw() {
  gameFloor(0, 350);
  yellowGuy(100, 300);
  oppGuy(200, 300);
  jibsGuy(300, 300);
  nugget(400, 320);
  beer(450, 320);
}
