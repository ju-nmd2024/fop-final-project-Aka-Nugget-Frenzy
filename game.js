let thing = 5;
var level = 5;

var a = 0;
var state = "game";
var resultYes;

var allGrass = [];
var allNugget = [];
var allBeer = [];
var allDoor = [];

var grassX = 300;
var grassY = 400;
var theFloor = 500;
var copX = 20;
var copY = 450;
var yellowX = 120;
var yellowY = theFloor - 50;
var lastYellowY = yellowY;

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

//nugget
var nugX = 500;
var nugY = 470;
var nugWidth = 40;
var nugHeight = 50;

//beer
var beerX = 650;
var beerY = 470;
var beerWidth = 15;
var beerHeight = 30;

//counters
var score = 0;

function preload() {
  ground_img = loadImage("images/grasspres_0.png");
  beerImage = loadImage("images/beer.png");
  nuggetImage = loadImage("images/Chicken_Nugget.png");
  jibs1 = loadImage("images/jibs1.png");
  jibs2 = loadImage("images/jibs2.png");
  policeJetMax = loadImage("images/policejetpackMax.png");
  policeJetMin = loadImage("images/policejetpackMin.png");
  policeJetOff = loadImage("images/policejetpackoff.png");
  yellowCaught1 = loadImage("images/yellowcaught1.png");
  yellowCaught2 = loadImage("images/yellowcaught2.png");
  yellowJump = loadImage("images/yellowjump.png");
  yellowRoll = loadImage("images/yellowroll.png");
  yellowRun1 = loadImage("images/yellowrun1.png");
  yellowRun2 = loadImage("images/yellowrun2.png");
  yellowRun3 = loadImage("images/yellowrun3.png");
  yellowRun4 = loadImage("images/yellowrun4.png");
  doorImage = loadImage("images/exitdoor.png");
}

function setup() {
  createCanvas(1200, 675);
  frameRate(60);
  copStartPos = createVector(copX, copY);
  copPosition = copStartPos.copy();
  a = 0;
}

function movement() {
  yellowY = yellowY + yellowYSpeed;
  if (yellowY >= theFloor - 50) {
    jumpReady = true;
    yellowYSpeed = 0;
    yellowY = theFloor - 50;
  } else {
    jumpReady = false;
    yellowYSpeed += 2;
  }
  for (let i = 0; i < allGrass.length; i++) {
    allGrass[i].collide(yellowX, yellowY, lastYellowY);
    allGrass[i].display();
  }
  for (let i = 0; i < allNugget.length; i++) {
    allNugget[i].collide(yellowX, yellowY);
    allNugget[i].display();
  }
  for (let i = 0; i < allBeer.length; i++) {
    allBeer[i].collide(yellowX, yellowY);
    allBeer[i].display();
  }
  for (let i = 0; i < allDoor.length; i++) {
    allDoor[i].collide(yellowX, yellowY);
    allDoor[i].display();
  }
  lastYellowY = yellowY;
  if (keyIsDown(65)) {
    yellowX -= 5;
  }
  if (keyIsDown(68)) {
    yellowX += 5;
  }
}
function keyPressed() {
  if (key == " " && jumpReady == true) {
    yellowYSpeed -= 25;
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

function threeGrass(x, y, id) {
  a = 0;

  for (let i = 3 * id - 3; i < 3 * id; i++) {
    allGrass[i] = new grass(x + a, y);
    a = a + 50;
  }
}
function oneNugget(x, y, id) {
  for (let i = 1 * id - 1; i < 1 * id; i++) {
    allNugget[i] = new nugget(x, y);
  }
}

function oneBeer(x, y, id) {
  for (let i = 1 * id - 1; i < 1 * id; i++) {
    allBeer[i] = new beer(x, y);
  }
}
function oneDoor(x, y, id) {
  for (let i = 1 * id - 1; i < 1 * id; i++) {
    allDoor[i] = new door(x, y);
  }
}

function scoreboard() {
  push();
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(20);
  text("NUGGET COUNT:", 30, 50);
  text(score, 203, 50);
  pop();
}

function menuScreen() {
  background(0, 200, 250);
}
function dontScreen() {
  a = 0;
  background(0, 200, 250);
  if (state === "dont") {
    threeGrass(400, 400, 1);
    threeGrass(150, 300, 2);
    threeGrass(600, 300, 3);
    threeGrass(850, 200, 4);
    oneNugget(275, 475, 1);
    oneNugget(475, 375, 2);
    oneNugget(225, 275, 3);
    oneNugget(675, 275, 4);
    oneNugget(925, 175, 5);
  }
  textSize(20);
  text("Don't steal the nuggets...", 50, 400);
  push();
  gameFloor(0, theFloor);
  pop();

  oppGuy(copPosition.x, copPosition.y);
  yellowGuy(yellowX, yellowY);
  movement();
  if (keyIsDown(65) || keyIsDown(68) || keyIsDown(32)) {
    state = "game";
  }
}
function gameScreen() {
  a = 0;
  background(0, 200, 250);
  if (level === 1) {
    push();
    textSize(30);
    fill(255, 0, 0);
    text("I WARNED YOU", 50, 400);
    pop();

    if (thing === 1) {
      threeGrass(400, 400, 1);
      threeGrass(150, 300, 2);
      threeGrass(600, 300, 3);
      threeGrass(850, 200, 4);

      oneNugget(275, 475, 1);
      oneNugget(475, 375, 2);
      oneNugget(225, 275, 3);
      oneNugget(675, 275, 4);
      oneNugget(925, 175, 5);

      thing = 2;
    }
    if (score === 5) {
      oneDoor(1075, 432, 1);
    }
  }
  if (level === 2) {
    if (thing === 2) {
      allGrass = [];
      allNugget = [];
      allBeer = [];
      allDoor = [];
      yellowX = 120;
      yellowY = theFloor - 50;
      copPosition.x = 20;
      copPosition.y = 450;

      threeGrass(600, 400, 1);
      threeGrass(350, 100, 2);
      threeGrass(850, 300, 3);
      threeGrass(600, 200, 4);

      oneNugget(475, 475, 1);
      oneNugget(675, 375, 2);
      oneNugget(425, 75, 3);
      oneNugget(925, 275, 4);
      oneNugget(675, 175, 5);

      thing = 3;
    }
    if (score === 10) {
      threeGrass(100, 300, 5);
      oneDoor(150, 232, 1);
    }
  }
  if (level === 3) {
    if (thing === 3) {
      allGrass = [];
      allNugget = [];
      allBeer = [];
      allDoor = [];
      yellowX = 120;
      yellowY = theFloor - 50;
      copPosition.x = 20;
      copPosition.y = 450;

      threeGrass(300, 400, 1);
      threeGrass(150, 250, 2);
      threeGrass(650, 300, 3);
      threeGrass(400, 100, 4);
      threeGrass(900, 200, 5);

      oneNugget(375, 375, 1);
      oneNugget(225, 225, 2);
      oneNugget(475, 75, 3);
      oneNugget(725, 275, 4);
      oneNugget(975, 175, 5);

      thing = 4;
    }
    if (score === 15) {
      threeGrass(1050, 50, 6);
      oneDoor(1100, -18, 1);
    }
  }
  if (level === 4) {
    if (thing === 4) {
      allGrass = [];
      allNugget = [];
      allBeer = [];
      allDoor = [];
      yellowX = 120;
      yellowY = theFloor - 50;
      copPosition.x = 20;
      copPosition.y = 450;

      threeGrass(400, 350, 1);
      threeGrass(150, 100, 2);
      threeGrass(650, 250, 3);
      threeGrass(400, 100, 4);
      threeGrass(800, 150, 5);

      oneNugget(475, 325, 1);
      oneNugget(225, 75, 2);
      oneNugget(475, 75, 3);
      oneNugget(725, 225, 4);
      oneNugget(875, 125, 5);

      thing = 5;
    }
    if (score === 20) {
      oneDoor(1075, 432, 1);
    }
  }
  if (level === 5) {
    if (thing === 5) {
      allGrass = [];
      allNugget = [];
      allBeer = [];
      allDoor = [];
      yellowX = 120;
      yellowY = theFloor - 50;
      copPosition.x = 20;
      copPosition.y = 450;

      threeGrass(200, 350, 1);
      threeGrass(50, 200, 2);
      threeGrass(550, 300, 3);
      threeGrass(300, 100, 4);

      oneNugget(475, 475, 1);
      oneNugget(225, 75, 2);
      oneNugget(475, 75, 3);
      oneNugget(725, 225, 4);
      oneNugget(875, 125, 5);

      thing = 6;
    }
    if (score === 25) {
      threeGrass(550, 100, 5);
      oneDoor(600, 32, 1);
    }
  }

  copEndPos = createVector(yellowX, yellowY);
  distToTravel = p5.Vector.sub(copEndPos, copPosition);
  distToMovePerMs = p5.Vector.div(distToTravel, moveDurationMs);
  push();
  gameFloor(0, theFloor);
  pop();
  yellowGuy(yellowX, yellowY);
  oppGuy(copPosition.x, copPosition.y);
  movement();
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

  scoreboard();
}

function resultScreen(resultYes) {}

function draw() {
  if (state === "menu") {
    menuScreen();
  } else if (state === "dont") {
    dontScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen(resultYes);
  }
}

class grass {
  constructor(tX, tY) {
    this.x = tX;
    this.y = tY;
  }
  display() {
    push();
    translate(this.x, this.y);
    image(ground_img, 0, 0, 50, 50);
    pop();
  }
  collide(theX, theY, lastTheY) {
    if (
      theX + 50 >= this.x &&
      theX <= this.x + 50 &&
      theY >= this.y - 60 &&
      theY + 50 <= this.y &&
      theY >= lastTheY
    ) {
      yellowY = this.y - 50;
      yellowYSpeed = 0;
      jumpReady = true;
    }
  }
}

class nugget {
  constructor(nX, nY) {
    this.x = nX;
    this.y = nY;
  }
  display() {
    push();
    fill(255, 165, 0);
    translate(this.x, this.y);
    ellipse(0, 0, nugWidth, nugHeight);
    pop();
  }
  collide(theX, theY) {
    if (
      theX + 50 >= this.x &&
      theX <= this.x &&
      theY <= this.y &&
      theY + 50 >= this.y
    ) {
      score = score + 1;
      this.x = -1000;
    }
  }
}

class beer {
  constructor(bX, bY) {
    this.x = bX;
    this.y = bY;
  }
  display() {
    push();
    fill(185, 165, 0);
    translate(this.x, this.y);
    ellipse(0, 0, beerWidth, beerHeight);
    pop();
  }
  collide(theX, theY) {
    if (
      theX + 50 >= this.x &&
      theX <= this.x &&
      theY + 50 >= this.y &&
      theY <= this.y
    ) {
      yellowXSpeed = yellowXSpeed - 10;
      this.x = -1000;
    }
  }
}

class door {
  constructor(dX, dY) {
    this.x = dX;
    this.y = dY;
  }
  display() {
    push();
    translate(this.x, this.y);
    image(doorImage, 0, 0, 50, 68);
    pop();
  }
  collide(theX, theY) {
    if (
      theX + 50 >= this.x &&
      theX <= this.x + 50 &&
      theY + 50 >= this.y &&
      theY <= this.y + 68
    ) {
      level += 1;
    }
  }
}
