//Create variables here
var gameState=0
var dog
var foodS
var foodStock
var happyDog
var database

function preload()
{
  //load images here
  dogImage=loadImage("dogImg.png")
  dogImage2=loadImage("dogImg1.png")

}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  foodStock=database.ref("food")
  foodStock.on("value",readStock)
  foodStock.set(20)
  
  dog=createSprite(250,350)
  dog.addImage(dogImage)
  dog.scale=0.2

  
}


function draw() {  
  background(46,139,87)
  if(foodS!= undefined){
    textSize(20)
    fill (255)
    text("NOTE: press UP_ARROW KEY to feed dragon food",30,50)
    text("FOOD REMINING: "+foodS,150,150)
  }


  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImage2)
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage)
  }

  if(foodS===0){
    foodS=20
  }

  drawSprites();
  //add styles here
 
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  } 
    database.ref("/").update({
    food:x
  })

}


