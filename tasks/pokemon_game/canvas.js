const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 600;

const Character_speed = 1;
let canvasReady = true;
let canEncounter = true;

const playerImage = new Image();
playerImage.src = "Images/playerDown.png";
const playerUPImage = new Image();
playerUPImage.src = "Images/playerUp.png";
const playerLEFTImage = new Image();
playerLEFTImage.src = "Images/playerLeft.png";
const playerRIGHTImage = new Image();
playerRIGHTImage.src = "Images/playerRight.png";

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}
const encounterMap = [];
for (let i = 0; i < encounter_grass.length; i += 70) {
  encounterMap.push(encounter_grass.slice(i, 70 + i));
}

class Boundary {
  static width = 32;
  static height = 32;

  constructor({ position }) {
    this.position = position;
    this.width = 32;
    this.height = 32;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
class Encounter {
  static width = 32;
  static height = 32;

  constructor({ position }) {
    this.position = position;
    this.width = 32;
    this.height = 32;
  }

  draw() {
    c.fillStyle = "green";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const offset = {
  x: -512,
  y: -456,
};

const boundaries = [];
const encounters = [];

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 20833) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});
encounterMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2399) {
      encounters.push(
        new Encounter({
          position: {
            x: j * Encounter.width + offset.x,
            y: i * Encounter.height + offset.y,
          },
        })
      );
    }
  });
});

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "Images/pokemon_map2.png";

const foregroundImage = new Image();
foregroundImage.src = "Images/pokemon_map2_foreground.png";

image.onload = () => {};

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    if (this.moving) {
      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }

      if (this.frames.elapsed % 25 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++;
        } else {
          this.frames.val = 0;
        }
      }
    }
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 128 / 4 / 2,
    y: canvas.height / 2 - 45 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUPImage,
    left: playerLEFTImage,
    right: playerRIGHTImage,
    down: playerImage
  }
});
player.draw();

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const moveables = [background, ...boundaries, foreground, ...encounters];

function rectCollision({ rect1, rect2 }) {
  return (
    rect1.position.x + rect1.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y + rect1.height >= rect2.position.y &&
    rect1.position.y <= rect2.position.y + rect2.height
  );
}


function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  // boundaries.forEach((b) => {
  //   b.draw();
  // });
  // encounters.forEach((e) => {
  //   e.draw();
  // });
  player.draw();
  foreground.draw();
  let moving = true;
  player.moving = false;

  if (canvasReady) {
    if (keys.w.pressed && lastKey === "w") {
      for (let i = 0; i < boundaries.length; i++) {
        const b = boundaries[i];
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...b,
              position: {
                x: b.position.x,
                y: (b.position.y-16) + Character_speed,
              },
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
          player.moving = true;
          player.image = player.sprites.up;
          checkEncounter();

        moveables.forEach((moveable) => {
          moveable.position.y += Character_speed;
        });
      }
    } else if (keys.s.pressed && lastKey === "s") {
      for (let i = 0; i < boundaries.length; i++) {
        const b = boundaries[i];
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...b,
              position: {
                x: b.position.x,
                y: (b.position.y-16) - Character_speed,
              },
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
          player.moving = true;
          player.image = player.sprites.down;
          checkEncounter();

        moveables.forEach((moveable) => {
          moveable.position.y -= Character_speed;
        });
      }
    } else if (keys.a.pressed && lastKey === "a") {
      for (let i = 0; i < boundaries.length; i++) {
        const b = boundaries[i];
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...b,
              position: {
                x: b.position.x + Character_speed,
                y: (b.position.y-16),
              },
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
          player.moving = true;
          player.image = player.sprites.left;
          checkEncounter();

        moveables.forEach((moveable) => {
          moveable.position.x += Character_speed;
        });
      }
    } else if (keys.d.pressed && lastKey === "d") {
      for (let i = 0; i < boundaries.length; i++) {
        const b = boundaries[i];
        if (
          rectCollision({
            rect1: player,
            rect2: {
              ...b,
              position: {
                x: b.position.x - Character_speed,
                y: (b.position.y-16),
              },
            },
          })
        ) {
          moving = false;
          break;
        }
      }
      if (moving) {
          player.moving = true;
          player.image = player.sprites.right;
          checkEncounter();

        moveables.forEach((moveable) => {
          moveable.position.x -= Character_speed;
        });
      }
    }
  }
}
animate();


let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
