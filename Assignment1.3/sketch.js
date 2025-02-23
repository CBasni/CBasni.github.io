let spelunky1, spelunk2, spelunky3;
let characters = [];

function preload() {
  spelunky1 = loadImage("media/spelunky1.png"); // Sprite sheet for character 1
  spelunky2 = loadImage("media/spelunky2.png"); // Sprite sheet for character 2
  spelunky3 = loadImage("media/spelunky3.png"); // Sprite sheet for character 3
}

function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);

  // Create three characters with different sprite sheets
  let character1 = new Character(width / 4, height / 2, spelunky1);
  let character2 = new Character(width / 2, height / 2, spelunky2);
  let character3 = new Character((3 * width) / 4, height / 2, spelunky3);

  characters.push(character1, character2, character3);

  // Define animations for each character
  characters.forEach(character => {
    character.addAnimation("down", new SpriteAnimation(character.spriteSheet, 6, 5, 6));
    character.addAnimation("up", new SpriteAnimation(character.spriteSheet, 0, 5, 6));
    character.addAnimation("right", new SpriteAnimation(character.spriteSheet, 0, 0, 6));
    character.addAnimation("left", new SpriteAnimation(character.spriteSheet, 0, 0, 6, true));
    character.addAnimation("stand_right", new SpriteAnimation(character.spriteSheet, 0, 0, 1));
    character.addAnimation("stand_left", new SpriteAnimation(character.spriteSheet, 0, 0, 1, true));
    character.currentAnimation = "stand_right"; // Start standing right
  });
}

function draw() {
  background(220);

  // Update and draw each character
  characters.forEach(character => {
    character.draw();
  });
}

function keyPressed() {
  // Move all characters when arrow keys are pressed
  characters.forEach(character => character.keyPressed());
}

function keyReleased() {
  // Reset animation when keys are released
  characters.forEach(character => character.keyReleased());
}

// Character Class
class Character {
  constructor(x, y, spriteSheet) {
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
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
