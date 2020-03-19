

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events,
  Constraint = Matter.Constraint,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

//Setting up world and Engine
var engine;
var world;

//Setting up arrays to hold many objects, this helps with running functions on multiples of the same thing
var particles = [];
var plinkos = [];
var bounds = [];
var hitables = [];

//These are for setting the ball amount on the screen and how far they are apart
var cols =20;
var rows = 14;
var amount = 20;

var mConstraint;
var slingshot;
var ball;
var ground;
var bird;

var currentPoints = 0;
var totalPoints = 0;
var balls = 3;
var myVar;
var col1 = 255;
var col2 = 0;
 //^^^^   w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout1

//These are for using Images instead of shapes
var dotIMG;
var boxImg;
var bkgImg;

//Booleans
var endScore;
var unClick = true;

function preload() {
    
//Loading audio and Image files for use later
  ding = loadSound('ding.mp3');
  dotImg = loadImage('images/dot.png');
  boxImg = loadImage('images/equals.png');
  bkgImg = loadImage('images/skyBackground.png');
}



function setup() {
    
//General setup
  var canvas = createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
    
    
  //Changing to 20% of regular vertical gravity
    world.gravity.y = 0.2;
    world.gravity.x = 0;
    
  // Create new bird
    bird = new Bird(150, 300, 15);
   
  //Create new slingshot  
    slingshot = new SlingShot(innerWidth/5, innerHeight/4, bird.body);
   
  //Let mouse be seen by canvas
    var mouse = Mouse.create(canvas.elt);
    var options = {
    mouse: mouse
  };
    
   
    
    Events.on(engine, 'collisionStart', collision);
    
    
    
  // A fix for HiDPI displays
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);

   //For labeling collision between labeled elements 
  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
        
        if (balls >= 0){
      if (labelA == 'bird' && labelB == 'plinko') {
        currentPoints += 10;
           for (var i = 0; i < plinkos.length; i++) {
          plinkos[i].intersects(bird);
           }
      }
      if (labelA == 'plinko' && labelB == 'bird') {
       currentPoints += 10;
          for (var i = 0; i < plinkos.length; i++) {
          plinkos[i].intersects(bird);
           }
      }
        if (labelA == 'hitable' && labelB == 'bird') {
       currentPoints += 100;
      }
        
        if (labelA == 'bird' && labelB == 'hitable') {
       currentPoints += 100;
      }
        }
    }
  }

  Events.on(engine, 'collisionStart', collision);
    
    
//Creating the game board
  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing+ innerWidth/2;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
     spacing = height / rows;  
      var y = spacing + innerHeight/4 + (j * spacing);
      var p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }

    
    // Make boundaries on bottom, decide how many and the spacing.
  var b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing + innerWidth/2;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
    
    var b = new Boundary(innerWidth/2 - 50, height + 50, 10, 1500);
  bounds.push(b);
    
    
    //Make random hitable pegs
    for (var i = 0; i < amount; i++) {
    var x = random(innerWidth/2 + 50 ,width);
    var y = random(150, innerHeight- 200);
    var p = new Hitable(x, y, 10);
    hitables.push(p);
    }
}
    
    
   



//For getting rid of and making new birds and attaching them to the slingshot
function keyPressed() {
  if (key == ' ' && balls >=   0) {
    World.remove(world, bird.body);
    totalPoints = totalPoints + currentPoints;
    currentPoints = 0;
      if(balls >0){
        bird = new Bird(150, 300, 15);
        slingshot.attach(bird.body);
        unClick = true;
    }
      if (balls == 0){
          endScore = true;
      }
  }
 
}
//Let the bird fly on mouse release
function mouseReleased(){
    letGo();
}

function letGo(){
  setTimeout(midStep, 200);
}

function midStep(){
    slingshot.fly();
    if (unClick){
    balls -= 1 ;
    }
    unClick = false;
}

//^^^^https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_settimeout1


function newParticle() {
  var p = new Particle(300, 0, 10);
  particles.push(p);
}


function draw() {
    
    
    if (endScore =true){
    push();
    textSize(64);
    rectMode(CENTER);
    translate(100, 100);    
    text('Total Points: ' + totalPoints, 10,30);
    pop();
    }
    
    
  background(bkgImg);
    rectMode(CORNER);
    push();
    translate(50,50);
    textSize(32);
    text('Current Points: ' + currentPoints, 10,30);
    translate(0, 50);    
    text('Total Points: ' + totalPoints, 10,30);
    translate(0, 50);    
    text('Balls: ' + balls , 10,30);
    pop();
    rectMode(CENTER);
    
    //print(ball);
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    } 
  }
  Matter.Engine.update(engine);
  //ground.prototype.show();
  slingshot.show();
  bird.show();
      
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
    
  for (var i = 0; i < hitables.length; i++) {
    hitables[i].show();
  }
    
//   
    
}
