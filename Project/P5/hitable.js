function Hitable(x, y, r) {
  var options = {
    restitution: 1,
    friction: 0,
    isStatic: true
  };
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = 'hitable';
  this.r = r;
  World.add(world, this.body);
}

Hitable.prototype.show = function() {
  noStroke();
  fill('#f64555');
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
};
