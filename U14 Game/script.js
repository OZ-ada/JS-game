var player1;
var player2;
var ground;
var GRAVITY = 1;



function preload() {
    alien = loadImage("Player1.png")
    clown = loadImage("Player2.png")

}

function setup() {
    createCanvas(500, 500)

    player1 = createSprite(200, 440);
    player1.addImage(alien);
    player1.scale = 0.3
    player2 = createSprite(50, 440);
    player2.addImage(clown);
    player2.scale = 0.3
    ground = createSprite(500, 495, 1000, 50)



}

function draw() {
    background(61, 82, 99);
    
    if (keyIsDown(65)){
        
    }
        
    

    drawSprites();
}
