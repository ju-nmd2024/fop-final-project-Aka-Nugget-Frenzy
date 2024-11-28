//NuggetGame Characters
//backGround
//yellowGuy
//oppGuy
//jibsGuy
//nugget
//beer
var state = "game";
var floor = 500;
var resultYes;
var copX = 100;
var copY = 450;
var yellowX = 200;
var yellowY = 450;
var copStartPos = createVector(copStartX, copStartY);
var copEndPos = createVector(yellowX, yellowY);
var level = [1, 2, 3, 4, 5];

function preload() {
  ground_img = loadImage("images/grasspres_0");
}

function setup() {
  createCanvas(1200, 675);
  frameRate(60);
}

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

function menuScreen() {}
function gameScreen() {
  background(0, 200, 250);
  gameFloor(0, floor);
  yellowGuy(yellowX, yellowY);
  oppGuy(copX, copY);
}
function resultScreen(resultYes) {}

function draw() {
  if (state === "menu") {
    menuScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen(resultYes);
  }
}
