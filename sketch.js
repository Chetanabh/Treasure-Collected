var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var jwelleryG,swordGroup;
var END = 0;
var PLAY = 1 ;
var gameState = 1 ;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
jwelleryG=new Group();
swordGroup = new Group();

//boy.debug = true;
boy.setCollider("circle",0,0,600);
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    for(var i=0;i<jwelleryG.length;i++){  
    if(jwelleryG.isTouching(boy)) {
    treasureCollection++;
    jwelleryG.get(i).destroy();

    //console.log(i);
    treasureCollection = treasureCollection + 150;
      }
    } 
  if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END ; 
        boy.changeAnimation("sahilRunning", endImg );
    }
  
if (gameState === END){
  
  jwelleryG.destroyEach();
  jwelleryG.setVelocityYEach(0);
  
  swordGroup.destroyEach();
  swordGroup.setVelocityYEach(0);
  
  path.velocityY = 0;
  
  boy.addAnimation("SahilRunning",endImg);
  boy.x=200;
  boy.y = 200;
  boy.velocityY=0;
  boy.scale = 1;
}
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
}
function createCash() {
  if (World.frameCount % 70 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  jwelleryG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  jwelleryG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}