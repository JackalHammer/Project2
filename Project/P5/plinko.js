function Plinko(x, y, r) {
  var options = {
    restitution: 1,
    friction: 0,
    isStatic: true,
  };
    
    
  this.body = Bodies.circle(x, y, r, options);
  this.bCol = true;
  this.body.label = 'plinko';
  this.r = r;
  this.x = x;
  this.y = y;
  World.add(world, this.body);

Plinko.prototype.show = function() {
  var color1 = this.color;
  colorMode(RGB);
  noStroke();
  if (this.bCol){
  fill(col1);
} else{
    fill(col2)
}
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
};


 
  Plinko.prototype.intersects = function(other){
      var d = dist(this.x, this.y, other.body.position.x, other.body.position.y);
      
      console.log(this.x);
      console.log(this.y);
      console.log(other.body.posistion);
      console.log(other.body.posistion);
      
      if (d <= 40){    
      console.log('here');
      this.bCol = false;
      }
  };
}

