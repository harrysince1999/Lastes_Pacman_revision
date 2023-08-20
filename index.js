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
  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }
}

// A map representing the layout of the boundaries
const map = [
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", " ", "-", " ", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"],
];

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

// Drawing all the boundary objects on the canvas
boundaries.forEach((boundary) => {
  boundary.draw();
});

// Drawing the player on the canvas
player.draw();
