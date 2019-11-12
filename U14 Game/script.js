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

var p1jump = false;
var p2jump = false;

var count = 0;
var x;
var z;

function preload() {
    alien = loadImage("Player1.png")
    clown = loadImage("Player2.png")
    gun = loadImage("gun.png")
    boom = loadImage("explosion.png")

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

    p1Gun = createSprite((player1.position.x + 50), 690);
    p1Gun.addImage(gun)
    p1Gun.scale = 0.3;
    p2Gun = createSprite((player2.position.x - 50), 690)
    p2Gun.addImage(gun)
    p2Gun.scale = 0.3;
    p1Muzzle = createSprite(500,500);
    p1Muzzle.addImage(boom);
    p1Muzzle.scale = 0.03;
    
    



}

function draw() {
    background(61, 82, 99);

    //player 1 movement

    player1.velocity.y += GRAVITY;
    if (keyIsDown(65)) {
        player1.position.x -= 5;
        p1Gun.position.x = player1.position.x - 50
        p1Gun.mirrorX(1)
    }

    if (keyIsDown(68)) {
        player1.position.x += 5;
        p1Gun.position.x = player1.position.x + 50
        p1Gun.mirrorX(-1)
    }

    if (player1.collide(ground) || player1.collide(platforms)) {
        player1.velocity.y = 0;
    }

    p1Gun.position.y = player1.position.y

    //player 2 movement
    player2.velocity.y += GRAVITY
    if (keyIsDown(37)) {
        player2.position.x -= 5;
        p2Gun.position.x = player2.position.x - 50
        p2Gun.mirrorX(1)
    }

    if (keyIsDown(39)) {
        player2.position.x += 5;
        p2Gun.position.x = player2.position.x + 50;
        p2Gun.mirrorX(-1);
    }
    
    p2Gun.position.y = player2.position.y
    
//collisions
    if (player2.collide(ground) || player2.collide(platforms)) {
        player2.velocity.y = 0;
    }

    players.collide(platforms);
    players.collide(borders);
    borders.collide(players);

    plat6.velocity.x = platspeed;
    if (plat6.overlap(platborder2)) {
        platspeed = -3
    }
    if (plat6.overlap(platborder1)) {
        platspeed = 3
    }

    x = random(50)

    if (plat4.visible == true) {
        count++
        if (count > 300) {
            count = 0
        }
        if (count == Math.round(x)) {
            plat4.visible = false
            plat4.position.x = 5000; 
        } else {
            count++
            if (count == 300) {
                plat4.visible = true
            }
        }


    }

    if (plat4.visible == false) {
        if (count < 200) {
            count++
        }
        if (count == 200) {
            plat4.position.x = 200;
            plat4.visible = true;
        }
    }
    x = random(15)
    if (count < 15 && plat4.visible == true) {
        count += 1
        if (count == 15) {
            count = 0;
        }
    }
    if (Math.round(x) == count && plat4.visible == true) {
        plat4.visible = false
    }
    
    z = random(15)
    if(count <15 && plat4.visible == false){
        count += 1
    }
    else if(count == 15 && plat4.visible == false){
       count = 0 
    }
    
    if (Math.round(z) == count && plat4.visible == false){
        plat4.visible == true
    }
    



    text(Math.round(x), 500, 500)
    text(count, 500, 400)



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

