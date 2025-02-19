let spelunky1;
let character;

function preload() {
  spelunky1 = loadImage("media/spelunky1.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character(width / 2, height / 2);
  
  // Define animations using correct sprite sheet rows/columns
  character.addAnimation("down", new SpriteAnimation(spelunky1, 6, 5, 6));
  character.addAnimation("up", new SpriteAnimation(spelunky1, 0, 5, 6));
  character.addAnimation("right", new SpriteAnimation(spelunky1, 0, 0, 6));
  character.addAnimation("left", new SpriteAnimation(spelunky1, 0, 0, 6, true)); 
  character.addAnimation("stand_right", new SpriteAnimation(spelunky1, 0, 0, 1)); 
  character.addAnimation("stand_left", new SpriteAnimation(spelunky1, 0, 0, 1, true)); 

  character.currentAnimation = "stand_right"; // Start standing right
}

function draw() {
  background(220);
  character.draw();
}

function keyPressed() {
  character.keyPressed();
}

function keyReleased() {
  character.keyReleased();
}

// Character Class
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = "stand_right";
    this.animations = {};
    this.lastDirection = "right"; // Tracks last movement direction
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      // Move character based on current animation
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down": 
          this.y += 2;
          break;
        case "right":
          this.x += 2;
          this.lastDirection = "right"; // Update last direction
          break;
        case "left":
          this.x -= 2;
          this.lastDirection = "left"; // Update last direction
          break;
      }

      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        break;
    }
  }
  
  keyReleased() {
    // Return to standing animation, facing the last movement direction
    if (this.lastDirection === "right") {
      this.currentAnimation = "stand_right";
    } else {
      this.currentAnimation = "stand_left";
    }
  }
}

// Sprite Animation Class
class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration, flipped = false) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = flipped;
  }

  draw() {
    let s = this.flipped ? -1 : 1;
    scale(s, 1); // Flip sprite if necessary
    image(this.spritesheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}
