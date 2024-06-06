let circles = [];
let bgColor;
let circleCount = 0;
let maxCircles = 50; 
let spawnRate = 0.01; 

function setup() {
  createCanvas(1200, 800);
  colorMode(HSB, 360, 100, 100); 
  bgColor = color(random(360), random(20, 40), random(80, 100));
}

function draw() {
  background(bgColor);
  

  if (random(1) < spawnRate && circles.length < maxCircles) {
    let newCircle = {
      position: createVector(random(width), random(height)),
      velocity: p5.Vector.random2D().mult(random(1, 4)),
      radius: random(10, 50),
      color: color(random(360), random(20, 40), random(80, 100)), 
      collisionCount: 0 
    };
    
    let overlapping = false;
    for (let i = 0; i < circles.length; i++) {
      let other = circles[i];
      let d = dist(newCircle.position.x, newCircle.position.y, other.position.x, other.position.y);
      if (d < newCircle.radius + other.radius) {
        overlapping = true;
        break;
      }
    }
   
    if (!overlapping) {
      circles.push(newCircle);
    }
  }
  
  
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    
  
    fill(circle.color);
    noStroke();
    ellipse(circle.position.x, circle.position.y, circle.radius * 2);
    
   
    circle.position.add(circle.velocity);
    
    
    if (circle.position.x - circle.radius < 0 || circle.position.x + circle.radius > width) {
      circle.velocity.x *= -1;
      circle.color = color(random(360), random(20, 40), random(80, 100)); 
    }
    if (circle.position.y - circle.radius < 0 || circle.position.y + circle.radius > height) {
      circle.velocity.y *= -1;
      circle.color = color(random(360), random(20, 40), random(80, 100)); 
    }
    
   
    for (let j = i + 1; j < circles.length; j++) {
      let other = circles[j];
      let d = dist(circle.position.x, circle.position.y, other.position.x, other.position.y);
      if (d < circle.radius + other.radius) {
      
        let temp = circle.velocity.copy();
        circle.velocity = other.velocity.copy();
        other.velocity = temp;
        circle.color = color(random(360), random(20, 40), random(80, 100)); 
        other.color = color(random(360), random(20, 40), random(80, 100)); 
        
     
        circle.collisionCount++;
        other.collisionCount++;
      }
    }
    
 
    circle.position.x = constrain(circle.position.x, circle.radius, width - circle.radius);
    circle.position.y = constrain(circle.position.y, circle.radius, height - circle.radius);
    
    
    if (circle.collisionCount > 100) {
      circles.splice(i, 1);
      i--; 
    }
  }
}

function mouseClicked() {
  let newCircle = {
    position: createVector(mouseX, mouseY),
    velocity: p5.Vector.random2D().mult(random(1, 4)),
    radius: random(10, 50),
    color: color(random(360), random(20, 40), random(80, 100)), 
    collisionCount: 0 
  };
  circles.push(newCircle);
}
