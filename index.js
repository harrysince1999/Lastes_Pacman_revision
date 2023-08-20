// Selecting the canvas element from the webpage
const canvas = document.querySelector("canvas");

// Getting the 2D drawing context for the canvas
const c = canvas.getContext("2d");

// Adjusting the canvas dimensions to match the window size
canvas.width = innerWidth;
canvas.height = innerHeight;

// Defining a class for creating boundaries
class Boundary {
  // Static width and height for all instances of Boundary
  static width = 40;
  static height = 40;

  // Constructor to initialize position and velocity
  constructor({ position, velocity }) {
    this.position = position;
    this.width = 40; // Individual boundary width
    this.height = 40; // Individual boundary height
  }

  // Method to draw a boundary on the canvas
  draw() {
    c.fillStyle = "blue"; // Setting the fill color
    c.fillRect(this.position.x, this.position.y, this.width, this.height); // Drawing a filled rectangle
  }
}

// Defining a class for creating the player
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  // Method to draw the player on the canvas
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }

  // Method to update the player's position and redraw it
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

// An array to store boundary objects
const boundaries = [];

// Creating a player instance
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: { x: 0, y: 0 },
});

// Object to keep track of pressed keys
const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
};

let lastkey = '';

// A map representing the layout of the boundaries
const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", "-", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

// Looping through the map to create boundaries
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        // Creating a new Boundary object at the specified position
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
          })
        );
        break;
    }
  });
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Drawing all the boundary objects on the canvas
  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  // Updating player's position and velocity based on pressed keys
  player.update();
  player.velocity.y = 0;
  player.velocity.x = 0;

  if (keys.w.pressed && lastkey === 'w') {
    player.velocity.y = -5;
  } else if (keys.a.pressed && lastkey === 'a') {
    player.velocity.x = -5;
  } else if (keys.s.pressed && lastkey === 's') {
    player.velocity.y = 5;
  } else if (keys.d.pressed && lastkey === 'd') {
    player.velocity.x = 5;
  }
}

// Starting the animation loop
animate();

// Event listener for keydown events
addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = true;
      lastkey = 'w';
      break;
    case "a":
      keys.a.pressed = true;
      lastkey = 'a';
      break;
    case "s":
      keys.s.pressed = true;
      lastkey = 's';
      break;
    case "d":
      keys.d.pressed = true;
      lastkey = 'd';
      break;
  }
});

// Event listener for keyup events
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
