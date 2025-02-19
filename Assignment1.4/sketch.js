let bugs = [];
let squishedCount = 0;
let timeLeft = 30;
let gameOver = false;
let gameWon = false;
let bugSpriteSheet, squishedImg;
let numBugs = 5;
let frameWidth = 64, frameHeight = 64;
let animationFrames = 7;
let lastFrameTime;
let goal = 35; 

function preload() {
  bugSpriteSheet = loadImage("media/Moving Bug GIF.gif");
  squishedImg = loadImage("media/Sprite Squished Bug.png");
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < numBugs; i++) {
    bugs.push(new Bug(random(width), random(height)));
  }
  setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      gameOver = true;
      gameWon = squishedCount >= goal; 
    }
  }, 1000);
}

function draw() {
  background(220);

  if (!gameOver) {
    for (let bug of bugs) {
      bug.move();
      bug.display();
    }
    displayUI();
  } else {
    displayEndScreen();
  }
}

function displayUI() {
  fill(0);
  textSize(24);
  text(`Squished: ${squishedCount} / ${goal}`, 20, 30);
  text(`Time Left: ${timeLeft}s`, width - 180, 30);
}

function displayEndScreen() {
  textSize(32);
  fill(0);
  textAlign(CENTER);
  
  if (gameWon) {
    text(`🎉 You Win! 🎉`, width / 2, height / 2 - 40);
  } else {
    text(`Game Over! You needed ${goal} bugs.`, width / 2, height / 2 - 40);
  }

  text(`Final Score: ${squishedCount}`, width / 2, height / 2);
}

function mousePressed() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].isClicked(mouseX, mouseY)) {
      bugs[i].squish();
      squishedCount++;
    }
  }
}

class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.direction = p5.Vector.random2D();
    this.squished = false;
    this.squishTime = 0;
    this.frameIndex = 0;
    this.zigzagAngle = 0;
    this.zigzagChangeTime = millis();
  }

  move() {
    if (!this.squished) {
      // Change direction slightly at random intervals for zig-zag effect
      if (millis() - this.zigzagChangeTime > random(200, 500)) {
        this.zigzagAngle = random(-PI / 6, PI / 6);
        this.zigzagChangeTime = millis();
      }

      let zigzagDirection = p5.Vector.fromAngle(this.direction.heading() + this.zigzagAngle);
      this.x += zigzagDirection.x * this.speed;
      this.y += zigzagDirection.y * this.speed;

      if (this.x < 0 || this.x > width) this.direction.x *= -1;
      if (this.y < 0 || this.y > height) this.direction.y *= -1;

      if (millis() - lastFrameTime > 100) {
        this.frameIndex = (this.frameIndex + 1) % animationFrames;
        lastFrameTime = millis();
      }
    } else if (millis() - this.squishTime > 500) {
      this.respawn();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.direction.heading());
    if (!this.squished) {
      let sx = this.frameIndex * frameWidth;
      image(bugSpriteSheet, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight, sx, 0, frameWidth, frameHeight);
    } else {
      image(squishedImg, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);
    }
    pop();
  }

  isClicked(mx, my) {
    return !this.squished && dist(mx, my, this.x, this.y) < frameWidth / 2;
  }

  squish() {
    this.squished = true;
    this.squishTime = millis();
    this.speed += 0.8; 
  }

  respawn() {
    this.x = random(width);
    this.y = random(height);
    this.squished = false;
    this.direction = p5.Vector.random2D();
  }
}
