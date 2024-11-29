//NuggetGame Characters
//backGround
//yellowGuy
//oppGuy
//jibsGuy
//nugget
//beer
var grassX = 300;
var grassY = 400;
var state = "game";
var theFloor = 500;
var resultYes;
var copX = 100;
var copY = 450;
var yellowX = 200;
var yellowY = theFloor - 50;
var yellowYSpeed = 0;
var yellowXSpeed = 0;
var jumpReady = true;

var copStartPos;
var copPosition;
var copEndPos;

const stopAtDist = 50; //so the cop stops before going into yellow guy
var distToTravel; //calculates how much the cop needs to travel to yellow guy
const moveDurationS = 1; // if you stand still, the cop will catch you in this many seconds
const moveDurationMs = moveDurationS * 1000;
var distToMovePerMs;
var currentlyMoving = true;
var level = [1, 2, 3, 4, 5];

function preload() {
  ground_img = loadImage("images/grasspres_0.png");
}
function setup() {
  createCanvas(1200, 675);
  frameRate(60);
  copStartPos = createVector(copX, copY);
  copPosition = copStartPos.copy();
}

function movement() {
  //console.log("yellow " + yellowY);
  //console.log("grass " + (grassY+50));
  yellowY = yellowY + yellowYSpeed;
  if (yellowY >= theFloor - 50) {
    jumpReady = true;
    yellowYSpeed = 0;
    yellowY = theFloor - 50;
  } else {
    jumpReady = false;
    yellowYSpeed += 2;
  }
  if (keyIsDown(65)) {
    yellowX -= 5;
  } else if (keyIsDown(68)) {
    yellowX += 5;
  }
  if (
    yellowX + 50 >= grassX &&
    yellowX <= grassX + 50 &&
    yellowY >= grassY - 50 &&
    yellowY + 49 <= grassY
  ) {
    yellowY = grassY - 50;
    yellowYSpeed = 0;
    jumpReady = true;
    console.log("blabla");
  }
}
function keyPressed() {
  if (key == " " && jumpReady == true) {
    yellowYSpeed -= 30;
  }
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
function grass(x, y) {
  translate(x, y);
  image(ground_img, 0, 0, 50, 50);
}
function menuScreen() {}
function gameScreen() {
  copEndPos = createVector(yellowX, yellowY);
  distToTravel = p5.Vector.sub(copEndPos, copPosition);
  distToMovePerMs = p5.Vector.div(distToTravel, moveDurationMs);
  background(0, 200, 250);
  gameFloor(0, theFloor);
  yellowGuy(yellowX, yellowY);
  oppGuy(copPosition.x, copPosition.y);
  movement();
  grass(grassX, grassY);

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

  // if (
  //   yellowGuy.x >= grass.x &&
  //   yellowGuy.x <= grass.x + 50 &&
  //   yellowGuy.y >= grass.y
  // ) {
  //   yellowGuy.y = yellowGuy.y;
  //   jumpReady = true;
  //   yellowYSpeed = 0;
  // }
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
