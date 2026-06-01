let angle;
let snowflakes = [];
let windStrength = 0;

function setup() {
  createCanvas(800, 600);

  colorMode(HSB);
  angleMode(DEGREES);

  // Create snowflakes
  for (let i = 0; i < 600; i++) {
    snowflakes.push(new Snowflake());
  }
}

// The stronger the wind, the heavier the snow.
function draw() {
  background(50 + abs(windStrength) * 5);

  // TREE -------------------------

  angle = (mouseX / width) * 40;
  angle = min(angle, 90);
  windStrength = map(angle, 0, 40, -10, 10);

  push();

  translate(width / 2, height);

  stroke(mouseX / 2, 200, 255);
  line(0, 0, 0, -120);

  translate(0, -120);

  branch(120, 0);

  pop();

  // SNOW -------------------------

  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {
    flake.update(currentTime);
    flake.display();
  }
}

function branch(h, level) {
  stroke((level * 25 + frameCount) % 360, 255, 255);
  h *= 0.66;

  if (h > 2) {
    
    push();

    rotate(angle + windStrength * 0.2);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, level + 1);

    pop();

    push();

    rotate(-angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h, level + 1);

    pop();
  }
  // To make the tree's branches denser.
    else {
    fill(120, 255, 255);
    noStroke();
    ellipse(0, 0, 5, 5);
  }
}

class Snowflake {
  constructor() {
    this.posX = 0;
    this.posY = random(-height, 0);
    this.initialAngle = random(0, 360);
    this.size = random(1.5, 4.5);
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.color = color(
      random(180, 220),
      random(200, 256),
      random(200, 256)
    );
  }

  update(time) {
    let angularSpeed = 35;

    let snowAngle = this.initialAngle + angularSpeed * time;

  this.posX =
  width / 2 +
  this.radius * sin(snowAngle) +
  sin(time + this.initialAngle) * 6 +
  windStrength;

    let ySpeed = 8 / this.size + abs(windStrength) * 0.2;
    this.posY += ySpeed;

    if (this.posY > height) {
      this.posY = -50;
    }
  }

  display() {
    fill(
     red(this.color),
     green(this.color),
     blue(this.color),
     140 + abs(windStrength) * 5
    );

    noStroke();
    ellipse(
     this.posX,
     this.posY,
     this.size + abs(windStrength) * 0.2
     );
  }
}

// Each click increases the number of snowflakes.
function mousePressed() {
  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snowflake());
  }
// Control the upper limit of snowflakes
 if (snowflakes.length > 1200) {
    snowflakes.splice(0, 200);
  }
}
