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

const copStartPos = createVector(copStartX, copStartY);
var copPosition = copStartPos.copy();
var copEndPos = createVector(yellowX, yellowY);

const stopAtDist = 30; //so the cop stops before going into yellow guy
var distToTravel = p5.Vector.sub(copEndPos, copStartPos); //calculates how much the cop needs to travel to yellow guy
const moveDurationS = 3; // if you stand still, the cop will catch you in this many seconds
const moveDurationMs = moveDurationS * 1000;
var distToMovePerMs = p5.Vector.div(distToTravel, moveDurationMs);
var currentlyMoving = true;
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
  oppGuy(copPosition.x, 100);

  if (currentlyMoving) {
    var thisFrameMovement = p5.Vector.mult(distToMovePerMs, deltaTime);
    copPosition.add(thisFrameMovement);
  }
  if (
    abs(dist(copPosition.x, copPosition.y, copEndPos.x, copEndPos.y)) <
    stopAtDist
  ) {
    currentlyMoving = false;
  }
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
