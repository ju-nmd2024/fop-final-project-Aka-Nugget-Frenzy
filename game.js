var thing = 1;
var level = 1;
var moving = false;

var a = 0;
var state = "menu";

var resultYes;
var allGrass = [];
var allNugget = [];
var allBeer = [];
var allDoor = [];
var picsLeft = [];
var picsRight = [];
var picsJumpRight = [];
var picsJumpLeft = [];
var copPicsLeft = [];
var copPicsRight = [];
var yellowCaught = [];

var grassX = 300;
var grassY = 400;
var theFloor = 500;
var copX = 20;
var copY = 394;
var yellowX = 120;
var yellowY = theFloor - 97;
var lastYellowY = yellowY;
var yellowNowPic = null;
var copNowPic = null;
var caughtNowPic = null;

var caughtNowState = 0;
var yellowNowState = 0;
var copNowState = 0;
var direction = "right";
var yellowWidth;

var yellowYSpeed = 0;
var yellowYJumpMax = 25;
var yellowXSpeed = 5;
var jumpReady = true;

var copStartPos;
var copPosition;
var copEndPos;

const stopAtDist = 50; //so the cop stops before going into yellow guy
var distToTravel; //calculates how much the cop needs to travel to yellow guy
const moveDurationS = 2; // if you stand still, the cop will catch you in this many seconds
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
var score = 20;

//timer
var timer = 3;

function preload() {
  for (let i = 0; i < 4; i++) {
    picsLeft[i] = loadImage(`images/yellowRunL${i}.png`);
    picsRight[i] = loadImage(`images/yellowRun${i}R.png`);
  }
  for (let i = 0; i < 3; i++) {
    copPicsLeft[i] = loadImage(`images/policejetpack${i}L.png`);
    copPicsRight[i] = loadImage(`images/policejetpack${i}R.png`);
  }
  for (let i = 0; i < 2; i++) {
    yellowCaught[i] = loadImage(`images/yellowcaught${i}.png`);
  }

  yellowJumpL = loadImage("images/yellowjumpL.png");
  yellowJumpR = loadImage("images/yellowjumpR.png");
  ground_img = loadImage("images/grasspres_0.png");
  beerImage = loadImage("images/beer.png");
  startImage = loadImage("images/StartScreen.png");
  startButton = loadImage("images/startButton.png");
  resultImage = loadImage("images/wonScreen.png");
  groundImage = loadImage("images/groundImage.png");
  level1Image = loadImage("images/level1.png");
  level2Image = loadImage("images/level2.png");
  level3Image = loadImage("images/level3.png");
  level4Image = loadImage("images/level4.png");
  level5Image = loadImage("images/level5.png");
  nuggetImage = loadImage("images/Chicken_Nugget.png");
  doorImage = loadImage("images/exitdoor.png");
  copCaughtInvis = loadImage("images/oppCaught.png");
  yellowCaughtInvis = loadImage("images/yellowCaught.png");
}

function setup() {
  createCanvas(1200, 675);
  frameRate(60);
  copStartPos = createVector(copX, copY);
  copPosition = copStartPos.copy();
  a = 0;
  yellowNowPic = picsRight[yellowNowState];
  copNowPic = copPicsRight[copNowState];
  caughtNowPic = yellowCaught[caughtNowState];
  yellowWidth = 46.8;
}

function movement() {
  yellowY = yellowY + yellowYSpeed;
  if (yellowY >= theFloor - 97) {
    jumpReady = true;
    yellowYSpeed = 0;
    yellowY = theFloor - 97;
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

  //Left Movement
  moving = false;

  if (yellowNowState % 4 === 0 || yellowNowState % 4 === 2) {
    yellowWidth = 46.8;
  }
  if (yellowNowState % 4 === 1 || yellowNowState % 4 === 3) {
    yellowWidth = 68.75;
  }
  if (keyIsDown(65)) {
    yellowX -= yellowXSpeed;
    moving = true;

    yellowNowPic = picsLeft[yellowNowState];
    direction = "left";
  } else if (keyIsDown(68)) {
    //right
    yellowX += yellowXSpeed;
    moving = true;
    yellowNowPic = picsRight[yellowNowState];
    direction = "right";
  }

  if (direction === "right" && jumpReady == false) {
    yellowNowPic = yellowJumpR;
  } else if (direction === "left" && jumpReady == false) {
    yellowNowPic = yellowJumpL;
  }

  if (jumpReady === true) {
    if (moving == true) {
      if (frameCount % 12 === 0) {
        yellowNowState += 1;
        yellowNowState = yellowNowState % 4;
      }
    }
  }
}
function keyPressed() {
  moving = false;
  if (key == " " && jumpReady == true) {
    yellowYSpeed -= yellowYJumpMax;
  }
}

function gameFloor(x, y) {
  image(groundImage, x, y, 1200, 175);
}

function yellowGuy(x, y, pic, nowWidth) {
  push();
  translate(x, y);
  image(pic, 0, 0, nowWidth, 97);
  pop();
}

function oppGuy(x, y, pic) {
  push();
  translate(x, y);
  image(pic, 0, 0, 59, 106);
  pop();
}

function caught(x, y, pic) {
  push();
  translate(x, y);
  image(pic, 0, 0, 84.3, 131.25);
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
  image(startImage, 0, 0, 1200, 675);
  image(startButton, 450, 210, 300, 130);

  if (
    mouseX >= 460 &&
    mouseX <= 740 &&
    mouseY >= 220 &&
    mouseY <= 330 &&
    mouseIsPressed === true
  ) {
    state = "dont";
  }
}
function dontScreen() {
  a = 0;
  score = 0;
  level = 1;
  thing = 1;
  image(level1Image, 0, 0, 1200, 500);
  currentlyMoving = true;
  if (state === "dont") {
    resetGame();
    oneBeer(375, 450, 1);
    threeGrass(400, 400, 1);
    threeGrass(150, 300, 2);
    threeGrass(600, 300, 3);
    threeGrass(850, 200, 4);
    oneNugget(240, 450, 1);
    oneNugget(440, 350, 2);
    oneNugget(200, 250, 3);
    oneNugget(640, 250, 4);
    oneNugget(925, 150, 5);
  }
  textSize(20);
  fill(255);
  text("Don't steal the nuggets...", 50, 390);
  push();
  gameFloor(0, theFloor);
  pop();

  oppGuy(copPosition.x, copPosition.y, copNowPic);
  yellowGuy(yellowX, yellowY, yellowNowPic, yellowWidth);
  movement();
  if (keyIsDown(65) || keyIsDown(68) || keyIsDown(32)) {
    state = "game";
  }
}
function gameScreen() {
  a = 0;
  if (level === 1) {
    image(level1Image, 0, 0, 1200, 500);
    push();
    textSize(30);
    fill(255, 0, 0);
    text("I WARNED YOU", 50, 390);
    pop();

    if (thing === 1) {
      resetGame();
      oneBeer(375, 450, 1);
      threeGrass(400, 400, 1);
      threeGrass(150, 300, 2);
      threeGrass(600, 300, 3);
      threeGrass(850, 200, 4);

      oneNugget(240, 450, 1);
      oneNugget(440, 350, 2);
      oneNugget(200, 250, 3);
      oneNugget(640, 250, 4);
      oneNugget(925, 150, 5);

      thing = 2;
    }
    if (score === 5) {
      oneDoor(1075, 432, 1);
    }
  }
  if (level === 2) {
    image(level2Image, 0, 0, 1200, 500);
    if (thing === 2) {
      resetGame();

      oneBeer(345, 50, 1);

      threeGrass(600, 400, 1);
      threeGrass(350, 100, 2);
      threeGrass(850, 300, 3);
      threeGrass(600, 200, 4);

      oneNugget(350, 450, 1);
      oneNugget(650, 350, 2);
      oneNugget(400, 50, 3);
      oneNugget(895, 250, 4);
      oneNugget(645, 150, 5);

      thing = 3;
    }
    if (score === 10) {
      threeGrass(100, 300, 5);
      oneDoor(150, 232, 1);
    }
  }
  if (level === 3) {
    image(level3Image, 0, 0, 1200, 500);
    if (thing === 3) {
      resetGame();

      oneBeer(1010, 150, 1);

      threeGrass(300, 400, 1);
      threeGrass(150, 250, 2);
      threeGrass(650, 300, 3);
      threeGrass(400, 100, 4);
      threeGrass(900, 200, 5);

      oneNugget(350, 350, 1);
      oneNugget(200, 200, 2);
      oneNugget(450, 50, 3);
      oneNugget(700, 250, 4);
      oneNugget(950, 150, 5);

      thing = 4;
    }
    if (score === 15) {
      threeGrass(1050, 50, 6);
      oneDoor(1100, -18, 1);
    }
  }
  if (level === 4) {
    image(level4Image, 0, 0, 1200, 500);
    if (thing === 4) {
      resetGame();

      oneBeer(575, 450, 1);

      threeGrass(400, 350, 1);
      threeGrass(150, 100, 2);
      threeGrass(650, 250, 3);
      threeGrass(400, 100, 4);
      threeGrass(800, 150, 5);

      oneNugget(450, 300, 1);
      oneNugget(200, 50, 2);
      oneNugget(450, 50, 3);
      oneNugget(700, 200, 4);
      oneNugget(850, 100, 5);

      thing = 5;
    }
    if (score === 20) {
      oneDoor(1075, 432, 1);
    }
  }
  if (level === 5) {
    image(level5Image, 0, 0, 1200, 500);
    if (thing === 5) {
      resetGame();
      oneBeer(890, 450, 1);

      threeGrass(200, 350, 1);
      threeGrass(50, 200, 2);
      threeGrass(550, 300, 3);
      threeGrass(300, 100, 4);

      oneNugget(990, 450, 1);
      oneNugget(250, 300, 2);
      oneNugget(100, 150, 3);
      oneNugget(350, 50, 4);
      oneNugget(600, 250, 5);

      thing = 6;
    }
    if (score === 25) {
      threeGrass(550, 100, 5);
      oneDoor(600, 32, 1);
    }
  }
  if (level === 6) {
    state = "result";
  }
  copEndPos = createVector(yellowX, yellowY);
  distToTravel = p5.Vector.sub(copEndPos, copPosition);
  distToMovePerMs = p5.Vector.div(distToTravel, moveDurationMs);

  push();
  gameFloor(0, theFloor);
  pop();
  yellowGuy(yellowX, yellowY, yellowNowPic, yellowWidth);
  oppGuy(copPosition.x, copPosition.y, copNowPic);
  movement();

  if (currentlyMoving) {
    var thisFrameMovement = p5.Vector.mult(distToMovePerMs, deltaTime);
    copPosition.add(thisFrameMovement);
    if (copPosition.x < yellowX) {
      if (frameCount % 12 === 0) {
        copNowState += 1;
        copNowState = copNowState % 3;
        copNowPic = copPicsRight[copNowState];
      }
    } else if (copPosition.x > yellowX) {
      if (frameCount % 12 === 0) {
        copNowState += 1;
        copNowState = copNowState % 3;
        copNowPic = copPicsLeft[copNowState];
      }
    }
  }
  if (
    abs(dist(copPosition.x, copPosition.y, copEndPos.x, copEndPos.y)) <
    stopAtDist
  ) {
    caught(copPosition.x, copPosition.y, caughtNowPic);
    copNowPic = copCaughtInvis;
    yellowNowPic = yellowCaughtInvis;
    currentlyMoving = false;
    if (frameCount % 30 === 0) {
      caughtNowState += 1;
      caughtNowState = caughtNowState % 2;
      caughtNowPic = yellowCaught[caughtNowState];
    }
    if (frameCount % 60 === 0 && timer > 0) {
      timer--;
    }
    if (timer === 0) {
      state = "menu";
    }
  }

  scoreboard();
}

function resultScreen() {
  image(resultImage, 0, 0, 1200, 675);
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
  if (timer === 0) {
    state = "menu";
  }
}

function draw() {
  if (state === "menu") {
    menuScreen();
  } else if (state === "dont") {
    dontScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "result") {
    resultScreen();
  }
}

function resetGame() {
  timer = 3;
  yellowNowPic = picsRight[yellowNowState];
  copNowPic = copPicsRight[copNowState];
  yellowXSpeed = 5;
  yellowYJumpMax = 25;
  allGrass = [];
  allNugget = [];
  allBeer = [];
  allDoor = [];
  yellowX = 120;
  yellowY = theFloor - 97;
  copPosition.x = 20;
  copPosition.y = 394;
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
      theY >= this.y - 110 &&
      theY + 97 <= this.y &&
      theY >= lastTheY
    ) {
      yellowY = this.y - 97;
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
    image(nuggetImage, 0, 0, 50, 50);
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
    image(beerImage, 0, 0, 46, 50);
    pop();
  }

  collide(theX, theY) {
    if (
      theX + 50 >= this.x &&
      theX <= this.x &&
      theY + 50 >= this.y &&
      theY <= this.y
    ) {
      yellowXSpeed = 2;
      yellowYJumpMax = 15;
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
