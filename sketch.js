//variables for the gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//variables for the different parts of the game
var player , player_running, playerImage;
var ground, groundImage;
var safetyItem ,safetyImage, maskImage, covid, covidImage;
var safetyGroup, covidGroup;
var score = 0;
var survivalTime = 0;
var lives = 3

function preload(){
  
  //loads the images and animations
  player_running =loadImage("boy.png")
  safetyItemImage = loadImage("sanitizer.png");
  covidImage = loadImage("covid_19.png");
  groundImage = loadImage("city.jpg");
  maskImage = loadImage("mask.png");
}

function setup() {
  createCanvas(600,400);
 
  //creates the sprites for the player and gives him the animation
  player = createSprite(80,315,20,20);
  player.addImage("moving", player_running);
  player.scale = 0.2;
 
  
  //creates the ground sprite
  ground = createSprite(500,100,1200,10);
  ground.addImage("imageGround", groundImage);
  ground.scale = 2.5;
  ground.depth = player.depth;
  player.depth = player.depth+1;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(400,350,1200,10);
  invisibleGround.visible = false;
  
  //creates the groups for the obstacles and food
  safetyGroup = createGroup();
  covidGroup = createGroup();     
  
  score = 0;
  
  }


function draw() {
  //clears the background 
  background("black");
  
  //if gamestate is play do this... 
  if (gameState === PLAY) {
    survivalTime = survivalTime + Math.round(getFrameRate()/45);
  
    ground.velocityX = -4;
    
    if (ground.x < 1) {
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && player.y >= 285){
    player.velocityY=-20;
  }
   
    player.velocityY = player.velocityY+1;
    
    safety();
    corona();
    
  if (safetyGroup.isTouching(player)){
    safetyGroup.destroyEach();
    score = score + 2 ;
   
    
  }
 
   if(covidGroup.isTouching(player)){
   covidGroup.destroyEach();
   score = score-2;
   player.scale = 0.2
   lives = lives - 1;
  }
   
  if (lives === 0) {
    gameState = END
  }
    
}
  else if (gameState === END){
    player.destroy();
    ground.destroy();
    safetyGroup.destroyEach();
    covidGroup.destroyEach();
    stroke("white")
    fill("white")
    textSize(20)
    text("YOU ARE INFECTED", 200,200);
    text("PLEASE STAY AT HOME!", 180, 230)
   
  }
  
  player.collide(invisibleGround); 
  drawSprites();
  
  //displays the survival time
  stroke("red");
  textSize(13);
  fill("red");
  text("SURVIVAL TIME: "+ survivalTime, 430, 20);
  
  stroke("red");
  textSize(13);
  fill("red");
  text("SCORE: "+ score, 360, 20);
  
  stroke("red");
  textSize(13);
  fill("red");
  text("NUMBER OF LIVES: "+ lives, 219,20);
}

//function for the food.
function safety(){
  if(frameCount%80===0){
    
    safetyItem = createSprite(700);
    safetyItem.y = Math.round(random(100,160));
    safetyItem.addImage(safetyItemImage);
    safetyItem.scale=0.25
    safetyItem.velocityX=-7;
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: safetyItem.addImage(maskImage);
              break;
      case 2: safetyItem.addImage(safetyItemImage);
              break;
      default: break;
    }
    safetyItem.lifetime=200;
    safetyItem.depth = player.depth
    player.depth = player.depth+1
    safetyGroup.add(safetyItem);
    
  }
}

//fucntion for the obstacles.
function corona(){ 
  if(frameCount%100===0){
    
    covid = createSprite(700,322);             
    covid.addImage(covidImage);
    covid.scale=0.09 ;
    covid.velocityX = -(6 + score/100);
    covid.velocityX=-7;
    covid.lifetime=200;
    covid.setCollider("circle",0,0,600)
    covidGroup.add(covid);
  }
}






