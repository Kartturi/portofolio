let balls = [];

let threshold = 30;
let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  //background(236, 48, 59);

  for (let i = 0; i < 20; i++) {
    balls.push(new Ball());
  }

  frameRate(60);
}

function draw() {
  let color1 = color(236, 48, 59);
  let color2 = color(255, 153, 102);

  setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }

  checkForShake();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis == "Y") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis == "X") {
    // Left to right gradient
    for (let j = x; j <= x + w; j++) {
      let inter2 = map(j, x, x + w, 0, 1);
      let d = lerpColor(c1, c2, inter2);
      stroke(d);
      line(j, y, j, y + h);
    }
  }
}

function Ball() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.xspeed = random(-2, 2);
  this.yspeed = random(-2, 2);
  this.oxspeed = this.xspeed;
  this.oyspeed = this.yspeed;
  this.direction = 0.7;

  this.move = function() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  };

  // Bounce when touch the edge of the canvas
  this.turn = function() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    } else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    } else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    } else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  };

  // Add to xspeed and yspeed based on
  // the change in accelerationX value
  this.shake = function() {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  };

  // Gradually slows down
  this.stopShake = function() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function checkForShake() {
  // Calculate total change in accelerationX and accelerationY

  accChangeX = abs(accelerationX - pAccelerationX);

  accChangeY = abs(accelerationY - pAccelerationY);
  accChangeT = accChangeX + accChangeY;
  // If shake
  if (accChangeT >= threshold) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
    }
  }
  // If not shake
  else {
    for (let i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
    }
  }
}
