   
    var ground, invisibleGround, groundImage;
    var dog
    var bg_img 
    var dog_running
    var score = 0;
    var foodGroup, food1, food2, food3, food4
   
function preload() {
    groundImage = loadImage("gg.png")
    bg_img = loadImage("backgroundImg.png")
    dog_running = loadAnimation("dog1.png","dog2.png","dog3.png","dog4.png")
    food1 = loadImage("avocado.png");
    food2 = loadImage("brocolli.png");
    food3 = loadImage("grapes.png");

}

function setup() {
createCanvas(windowWidth, windowHeight);


//create a dog sprite
dog = createSprite(150,height-70,20,50);
dog.addAnimation("running", dog_running);
dog.scale = 0.8;

//create a ground sprite
   /* ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;*/

    ground = createSprite(width/2,height-6,200,700); 
    ground.addImage("ground",groundImage);
    ground.scale= 2.7;
      ground.velocityX = -4;
    

    //invsGround = createSprite(200,190,400,10);
    invsGround = createSprite(width/2,height-7,width,125);  
    invsGround.visible = false;

    foodGroup = new Group(); 
}

function draw() {
background(bg_img);

//jump when the space button is pressed
    if (keyDown("space") && dog.y>=100) {
    dog.velocityY = -20;
    }

    dog.velocityY = dog.velocityY + 0.8
    if (ground.x < 0) {
    ground.x = ground.width / 4;
    }


    dog.collide(invsGround);

    function spawnFood() {
        if(frameCount % 60 === 0) {
          var food = createSprite(600,random((height-200,height-220)),10,30);
          food.setCollider('circle',0,0,45)
          food.scale=0.9;
          // obstacle.debug = true
        
          food.velocityX = -(6 + 3*score/100);
          
          //generate random obstacles
          var rand = Math.round(random(1,3));
          switch(rand) {
            case 1: food.addImage(food1);
                    break;
            case 2: food.addImage(food2);
                    break;
            case 3: food.addImage(food3);
                    break;
            default: break;
          }
          
          //assign scale and lifetime to the obstacle           
          food.scale = 0.3;
          food.lifetime = 300;
          food.depth = dog.depth;
          dog.depth +=1;
          //add each obstacle to the group
          foodGroup.add(food);
        }
      }

      spawnFood();
    
    drawSprites();
    }

