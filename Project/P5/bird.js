
// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY
// https://editor.p5js.org/codingtrain/sketches/LbNt1nyxE

function Bird(x, y, r) {
    var options = {
      restitution: 0.5
    };
    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
    this.r = r;
    this.body.label = 'bird';
   
  

  Bird.prototype.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(dotImg, 0, 0, this.r * 2, this.r * 2);
    pop();
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    
  }
}
