// Angry Birds
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/138-angry-birds.html
// https://youtu.be/TDQzoe9nslY
// https://editor.p5js.org/codingtrain/sketches/LbNt1nyxE

function SlingShot(x, y, body) {
    var options = {
      pointA: {
        x: x,
        y: y,
        stiffness:1 
      },
      bodyB: body,
      stiffness: 0.02,
      length: 70
    };
    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  

  SlingShot.prototype.fly = function() {
    this.sling.bodyB = null;
  }

  SlingShot.prototype.show = function() {
    if (this.sling.bodyB) {
      stroke(0);
      strokeWeight(4);
      var posA = this.sling.pointA;
      var posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }

  SlingShot.prototype.attach = function(body) {
    this.sling.bodyB = body;
  }
}
