var player1;
var player2;
var ground;
var plat1;
var plat2;
var plat3;
var plat4;
var plat5;
var GRAVITY = 1;
var JUMP = 16;
var platspeed = 3;

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
    players.add(player1)
    players.add(player2)

    ground = createSprite(500, 745, 1000, 50);
    leftwall = createSprite(0, 500, 10, 1000);
    rightwall = createSprite(1000, 0, 10, 10000);
    roof = createSprite(500, 0, 1000, 10);
    borders = new Group();
    borders.add(ground);
    borders.add(leftwall);
    borders.add(rightwall);
    borders.add(roof);

    platforms = Group();
    plat1 = createSprite(200, 620, 300, 10);
    plat2 = createSprite(800, 620, 300, 10);
    plat3 = createSprite(500, 510, 300, 10);
    plat4 = createSprite(200, 400, 300, 10);
    plat5 = createSprite(800, 400, 300, 10);
    plat6 = createSprite(500, 290, 300, 10);
    platforms.add(plat1);
    platforms.add(plat2);
    platforms.add(plat3);
    platforms.add(plat4);
    platforms.add(plat5);
    platforms.add(plat6);

    platborder1 = createSprite(100, 290, 10, 50)
    platborder2 = createSprite(900, 290, 10, 50)
    platborder1.visible = false;
    platborder2.visible = false;


}

function draw() {
    background(61, 82, 99);

    //player 1 movement

    player1.velocity.y += GRAVITY;
    if (keyIsDown(65)) {
        player1.position.x -= 5;
    }

    if (keyIsDown(68)) {
        player1.position.x += 5;
    }

    if (player1.collide(ground) || player1.collide(platforms)) {
        player1.velocity.y = 0;
    }

    //player 2 movement
    player2.velocity.y += GRAVITY
    if (keyIsDown(37)) {
        player2.position.x -= 5;
    }

    if (keyIsDown(39)) {
        player2.position.x += 5;
    }

    if (player2.collide(ground) || player2.collide(platforms)) {
        player2.velocity.y = 0;
    }

    players.collide(platforms);
    players.collide(borders);
    borders.collide(players);

    x = random(6000);
    text(Math.round(x), 500, 310);
    if (x > 400 && x < 500) {
        plat4.visible = false;
    } else {
        plat4.visible = true;
    }

    plat6.velocity.x = platspeed;
    if (plat6.overlap(platborder2)) {
        platspeed = -3
    }
    if (plat6.overlap(platborder1)) {
        platspeed = 3
    }


    drawSprites();
}

function keyPressed() {
    if (keyCode === UP_ARROW && p2jump == false) {
        player2.velocity.y -= JUMP;
        p2jump = true
    } else {
        if (player2.velocity.y === 0) {
            p2jump = false;
        }
    }

    if (keyIsDown(87) && p1jump == false) {
        player1.velocity.y -= JUMP;
        p1jump = true
    } else {
        if (player1.velocity.y === 0) {
            p1jump = false;
        }
    }

}
