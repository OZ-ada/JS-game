var player1;
var player2;
var ground;
var plat1;
var plat2;
var plat3;
var plat4;
var plat5;



function preload() {
    alien = loadImage("Player1.png")
    clown = loadImage("Player2.png")

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
    plat1 = createSprite(125,650,50,10)
    platforms.add(plat1)



}

function draw() {
    background(61, 82, 99);
    //player 1 movement
    if (keyIsDown(65)) {
        player1.position.x -= 5
    }

    if (keyIsDown(68)) {
        player1.position.x += 5
    }

    if (keyIsDown(87)) {
        player1.position.y -= 10
    }

    if (player1.position.y < 630) { //acts as a force of gravity that pulls the player down if they go above a certain y level
        player1.setVelocity(0, 5)
    }

    if (player1.position.y == 690) { //resets the players velocity when they hit the ground so that they can jump again
        player1.setVelocity(0, 0)
    }

    //player 2 movement
    if (keyIsDown(37)) {
        player2.position.x -= 5
    }

    if (keyIsDown(39)) {
        player2.position.x += 5
    }

    if (keyIsDown(38)) {
        player2.position.y -= 10
    }

    if (player2.position.y < 630) {
        player2.setVelocity(0, 5)
    }

    if (player2.position.y == 690) {
        player2.setVelocity(0, 0)
    }
    
    players.collide(ground);
    players.collide(platforms);

    drawSprites();
}
