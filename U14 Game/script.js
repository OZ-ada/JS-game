var player1;
var player2;
var ground;
var plat1;
var plat2;
var plat3;
var plat4;
var plat5;
var GRAVITY = 1;
var JUMP = 15;

var p1jump = false
var p2jump = false


function preload() {
    alien = loadImage("Player1.png")
    clown = loadImage("Player2.png")
    gun = loadImage("gun.png")

}

function setup() {
    createCanvas(1000, 750)

    player1 = createSprite(50, 690);
    player1.addImage(alien);
    player1.scale = 0.3;
    player2 = createSprite(950, 690);
    player2.addImage(clown);
    player2.scale = 0.3;
    players = Group();

    ground = createSprite(500, 745, 1000, 50)

    platforms = Group();
    plat1 = createSprite(125, 650, 50, 10)
    platforms.add(plat1)



}

function draw() {
    background(61, 82, 99);
    //player 1 movement

    player1.velocity.y += GRAVITY;
    if (keyIsDown(65)) {
        player1.position.x -= 5
    }

    if (keyIsDown(68)) {
        player1.position.x += 5
    }

    if (player1.collide(ground) || player1.collide(platforms)) {
        player1.velocity.y = 0
    }

    //player 2 movement
    player2.velocity.y += GRAVITY
    if (keyIsDown(37)) {
        player2.position.x -= 5
    }

    if (keyIsDown(39)) {
        player2.position.x += 5
    }

    if (player2.collide(ground) || player2.collide(platforms)) {
        player2.velocity.y = 0
    }


    
    player1.collide(platforms);
    player2.collide(platforms);

    drawSprites();
}

function keyPressed() {
    if (keyCode === UP_ARROW && p2jump == false) {
        player2.velocity.y -= JUMP;
        p2jump = true
    }
    
    else {
        if (player2.velocity.y === 0) {
         p2jump = false;   
        }
    }
    
    if (keyIsDown(87) && p1jump == false){
        player1.velocity.y -= JUMP;
        p1jump = true
    }
    
    else{
        if (player1.velocity.y === 0) {
         p1jump = false;   
        }
    }

}