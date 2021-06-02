var monkey,monkeyspaceship,monkeylanding
var obstacle,banana,pineapple,strawberry,coconut
var bg,backgroundImage;
var restartbutton;
var score= 0 ;
var GameState = "play";

function preload(){

    backgroundImage = loadImage("background.png");
    bananaImage = loadImage("banana.png");
    coconutImage = loadImage("coconut.png");
    monkeylandingImage = loadImage("monkeylanding.png");
    monkeyspaceshipImage = loadImage("monkeyspaceship.png");
    obstacleImage = loadImage("obstacle.png");
    pineappleImage = loadImage("pineapple.png");
    strawberryImage = loadImage("strawberry.png");
    restartImage = loadImage("restart.jpg");

}

function setup(){
    
    canvas = createCanvas(600, 400);

    bg = createSprite(600,300);
    bg.addImage(backgroundImage);
    bg.velocityX = -2;
    bg.scale = 3;

    monkeyspaceship = createSprite(100,100,100,100);
    monkeyspaceship.addImage(monkeyspaceshipImage);
    monkeyspaceship.scale = 0.3;
    monkeyspaceship.setCollider("rectangle", 35,-50,230,500);
    monkeyspaceship.debug = false;

    restartbutton = createSprite(300,300,50,50);
    restartbutton.addImage(restartImage);
    restartbutton.scale = 0.2;
    
    foodGroup = new Group();
    obstacleGroup = new Group();
}

function draw(){

    background("blue");

    if (GameState === "play"){

        if (bg.x<0){
            bg.x = bg.width/2;
        }
    
        if (monkeyspaceship.isTouching(foodGroup)){
            score = score+20;
            foodGroup.destroyEach();
        }
        
    edges = createEdgeSprites();
    monkeyspaceship.collide(edges);

    if (monkeyspaceship.isTouching(obstacleGroup)){
        GameState = "end";
    }

    if (keyDown("up_arrow")){
        monkeyspaceship.velocityY = 2;
    }

    if (keyDown("down_arrow")){
        monkeyspaceship.velocityY = -2;
    }

    if (mousePressed(restartbutton)){
        reset();
    }

    restartbutton.visible = false;

    fruits();
    obstacles();
   // mousePressed();
    }
    
    else if (GameState === "end"){
        
        bg.velocityX = 0;
        bg.visible = false;
        food.visible = false;
        obstacle.visible = false;
        restartbutton.visible = true;
        foodGroup.destroyEach();
        obstacleGroup.destroyEach();
        monkeyspaceship.destroy();
         
        fill("black");
        textSize(50);
        text("Game Over" , 200,200);
    } 
    drawSprites();
    fill("white");
    textSize(20);
    text("score " + score, 500,25);  
}

function fruits(){

    if (frameCount% 120 === 0){

        food = createSprite(600,300,20,20);
        food.velocityX = -2;
        food.y = Math.round(random(200,500));
        var rand = Math.round(random(1,4));
        switch(rand){
            case 1: food.addImage(bananaImage);
            food.scale = 0.3;
            break;
            case 2: food.addImage(coconutImage);
            food.scale = 0.3;
            break;
            case 3: food.addImage(strawberryImage);
            food.scale = 0.3;
            break;
            case 4: food.addImage(pineappleImage);
            food.scale = 0.3;
            break;
            default: break;    
        }

        foodGroup.add(food);
        foodGroup.lifeTime = 200;
    }

}

function obstacles(){

if (frameCount% 120 === 0){
    obstacle = createSprite(600,300,10,10);
    obstacle.scale = 0.5;
    obstacle.setCollider("rectangle" ,0,60,300,120);
    obstacle.debug = false;
    obstacle.y = Math.round(random(200,500));
    obstacle.velocityX = -2;
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
    obstacleGroup.lifeTime = 200;

}
}

//function mousePressed(){
  //  monkeyspaceship.rotation = monkeyspaceship.rotation+2;
//}

function reset(){
    GameState = "play";
    score.visible= false;
}

