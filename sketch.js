var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  removeFood=createButton("Alimentar al perro");
  removeFood.position(675,95);
  removeFood.mousePressed(feedDog);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFed=data.val();
  });
  
 
  if(lastFed>=12){
    fill("black")
    text("Ultima hora que se alimentó:"+lastFed % 12+"PM", 450,50);
  }else if(lastFed==0){
    fill("black")
    text("Ultima hora que se alimentó: 12AM", 450,50);
  }else{
    fill("black")
    text("Ultima hora que se alimentó:"+lastFed % 12+"AM", 450,50);
  }

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}

function addFoods(){
  dog.addImage(sadDog)
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
